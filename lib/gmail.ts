
import { google } from "googleapis";
import { randomUUID } from "node:crypto";

export interface GmailSendResult {
    messageId: string;
    threadId: string | null;
    rfcMessageId: string | null;
}

interface SendGmailOptions {
    to: string;
    cc?: string;
    replyTo?: string;
    subject: string;
    text: string;
    html: string;
    threadId?: string | null;
    inReplyTo?: string | null;
    references?: string | null;
}

function requiredEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Variable d'environnement manquante : ${name}`);
    }

    return value;
}

export function isGmailConfigured(): boolean {
    return Boolean(
        process.env.CONTACT_EMAIL &&
        process.env.GMAIL_CLIENT_ID &&
        process.env.GMAIL_CLIENT_SECRET &&
        process.env.GMAIL_REFRESH_TOKEN
    );
}

export function getGmailClient() {
    const oauth2Client = new google.auth.OAuth2(
        requiredEnv("GMAIL_CLIENT_ID"),
        requiredEnv("GMAIL_CLIENT_SECRET"),
    );

    oauth2Client.setCredentials({
        refresh_token: requiredEnv("GMAIL_REFRESH_TOKEN"),
    });

    return google.gmail({
        version: "v1",
        auth: oauth2Client,
    });
}

function encodeHeader(value: string): string {
    const safeValue = value.replace(/[\r\n]/g, " ");

    return `=?UTF-8?B?${Buffer.from(safeValue, "utf8").toString("base64")}?=`;
}

function wrapBase64(value: string): string {
    return value.match(/.{1,76}/g)?.join("\r\n") ?? "";
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function createRawEmail(options: SendGmailOptions): string {
    const boundary = `portfolio_${randomUUID().replace(/-/g, "")}`;

    const headers = [
        `From: ${requiredEnv("CONTACT_EMAIL")}`,
        `To: ${options.to}`,
        ...(options.cc ? [`Cc: ${options.cc}`] : []),
        ...(options.replyTo ? [`Reply-To: ${options.replyTo}`] : []),
        `Subject: ${encodeHeader(options.subject)}`,
        ...(options.inReplyTo
            ? [`In-Reply-To: ${options.inReplyTo}`]
            : []),
        ...(options.references
            ? [`References: ${options.references}`]
            : []),
        `MIME-Version: 1.0`,
        `Content-Type: multipart/alternative; boundary="${boundary}"`,
    ];

    const textContent = Buffer
        .from(options.text, "utf8")
        .toString("base64");

    const htmlContent = Buffer
        .from(options.html, "utf8")
        .toString("base64");

    const mime = [
        ...headers,
        "",
        `--${boundary}`,
        `Content-Type: text/plain; charset="UTF-8"`,
        `Content-Transfer-Encoding: base64`,
        "",
        wrapBase64(textContent),
        "",
        `--${boundary}`,
        `Content-Type: text/html; charset="UTF-8"`,
        `Content-Transfer-Encoding: base64`,
        "",
        wrapBase64(htmlContent),
        "",
        `--${boundary}--`,
    ].join("\r\n");

    return Buffer.from(mime, "utf8").toString("base64url");
}

export async function sendGmailMessage(
    options: SendGmailOptions,
): Promise<GmailSendResult> {
    const gmail = getGmailClient();

    const raw = createRawEmail(options);

    const response = await gmail.users.messages.send({
        userId: "me",
        requestBody: {
            raw,
            ...(options.threadId
                ? { threadId: options.threadId }
                : {}),
        },
    });

    const messageId = response.data.id;

    if (!messageId) {
        throw new Error("Gmail n'a retourné aucun identifiant de message.");
    }

    const savedMessage = await gmail.users.messages.get({
        userId: "me",
        id: messageId,
        format: "metadata",
        metadataHeaders: ["Message-ID"],
    });

    const rfcMessageId = savedMessage.data.payload?.headers?.find(
        (header) => header.name?.toLowerCase() === "message-id",
    )?.value ?? null;

    return {
        messageId,
        threadId: response.data.threadId ?? null,
        rfcMessageId,
    };
}

/**
 * Notification envoyée après l'enregistrement du message dans PostgreSQL.
 */
export async function sendContactNotification(message: {
    id: string;
    name: string;
    email: string;
    message: string;
}): Promise<GmailSendResult & { subject: string }> {
    const adminEmail = requiredEnv("CONTACT_EMAIL");

    const subject = `Nouveau message de ${message.name}`;

    const safeName = escapeHtml(message.name);
    const safeEmail = escapeHtml(message.email);
    const safeMessage = escapeHtml(message.message)
        .replace(/\r?\n/g, "<br />");

    const dashboardUrl =
        `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/admin/messages`;

    const html = `
        <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;color:#1f2937">
            <h2>Nouveau message depuis le portfolio</h2>

            <p><strong>Nom :</strong> ${safeName}</p>
            <p><strong>Email :</strong> ${safeEmail}</p>

            <hr style="border:0;border-top:1px solid #e5e7eb;margin:24px 0" />

            <h3>Message</h3>

            <p style="line-height:1.8">${safeMessage}</p>

            <p style="margin-top:28px">
                <a href="${dashboardUrl}"
                    style="display:inline-block;background:#0d9488;color:white;padding:12px 20px;border-radius:8px;text-decoration:none">
                        Consulter dans le Dashboard
                </a>
            </p>
        </div>
    `;

    const text = [
        "Nouveau message depuis le portfolio",
        "",
        `Nom : ${message.name}`,
        `Email : ${message.email}`,
        "",
        message.message,
        "",
        `Dashboard : ${dashboardUrl}`,
    ].join("\n");

    const result = await sendGmailMessage({
        to: adminEmail,
        replyTo: message.email,
        subject,
        text,
        html,
    });

    return {
        ...result,
        subject,
    };
}

/**
 * Répond au visiteur depuis le Dashboard.
 * Une copie est envoyée à l'adresse administrateur.
 */
export async function sendContactReply(options: {
    to: string;
    name: string;
    body: string;
    threadId?: string | null;
    originalRfcMessageId?: string | null;
    latestRfcMessageId?: string | null;
    subject: string;
}): Promise<GmailSendResult> {
    const adminEmail = requiredEnv("CONTACT_EMAIL");

    const text = options.body;

    const html = `
        <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;color:#1f2937">
            <p>Bonjour ${escapeHtml(options.name)},</p>

            <div style="line-height:1.8;white-space:pre-wrap">
                ${escapeHtml(options.body).replace(/\r?\n/g, "<br />")}
            </div>

            <hr style="border:0;border-top:1px solid #e5e7eb;margin:24px 0" />

            <p style="font-size:12px;color:#6b7280">
                Réponse envoyée depuis le portfolio de Zo Lantosoa.
            </p>
        </div>
    `;

    const references = [
        options.originalRfcMessageId,
        options.latestRfcMessageId,
    ]
        .filter((value): value is string => Boolean(value))
        .filter((value, index, array) => array.indexOf(value) === index)
        .join(" ");

    return sendGmailMessage({
        to: options.to,
        cc: adminEmail,
        subject: options.subject,
        text,
        html,
        threadId: options.threadId,
        inReplyTo:
            options.latestRfcMessageId ??
            options.originalRfcMessageId,
        references: references || null,
    });
}
