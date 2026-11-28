
import type { gmail_v1 } from "googleapis";

import { prisma } from "@/lib/prisma";
import { getGmailClient, isGmailConfigured } from "@/lib/gmail";

function getHeader(
    message: gmail_v1.Schema$Message,
    name: string,
): string | null {
    const header = message.payload?.headers?.find(
        (item) => item.name?.toLowerCase() === name.toLowerCase(),
    );

    return header?.value ?? null;
}

function decodeBody(data?: string | null): string {
    if (!data) return "";

    return Buffer.from(data, "base64url").toString("utf8");
}

function findBodyPart(
    part: gmail_v1.Schema$MessagePart | null | undefined,
    mimeType: string,
): string | null {
    if (!part) return null;

    if (part.mimeType === mimeType && part.body?.data) {
        return decodeBody(part.body.data);
    }

    for (const child of part.parts ?? []) {
        const result = findBodyPart(child, mimeType);

        if (result) return result;
    }

    return null;
}

function extractMessageBody(
    message: gmail_v1.Schema$Message,
): string {
    const payload = message.payload;

    const plainText = findBodyPart(payload, "text/plain");

    if (plainText?.trim()) {
        return plainText.trim();
    }

    const html = findBodyPart(payload, "text/html");

    if (!html) return message.snippet ?? "";

    return html
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/p>/gi, "\n")
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;|&#039;/g, "'")
        .replace(/[ \t]+\n/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}

/**
 * Synchronise les messages envoyés directement depuis Gmail.
 *
 * Le message de notification initial est ignoré.
 * Les réponses déjà sauvegardées ne sont pas dupliquées.
 */
export async function syncGmailSentReplies(): Promise<number> {
    if (!isGmailConfigured()) {
        return 0;
    }

    const trackedMessages = await prisma.contactMessage.findMany({
        where: {
            gmailThreadId: {
                not: null,
            },
        },
        select: {
            id: true,
            createdAt: true,
            gmailThreadId: true,
            gmailNotificationId: true,
            gmailRfcMessageId: true,
        },
    });

    if (trackedMessages.length === 0) {
        return 0;
    }

    const messageByThread = new Map(
        trackedMessages
            .filter(
                (message): message is typeof message & {
                    gmailThreadId: string;
                } => Boolean(message.gmailThreadId),
            )
            .map((message) => [
                message.gmailThreadId,
                message,
            ]),
    );

    /*const messageByThread = new Map<
        string,
        (typeof trackedMessages)[number]
    >();

    for (const message of trackedMessages) {
        if (message.gmailThreadId) {
            messageByThread.set(message.gmailThreadId, message);
        }
    }*/

    const oldestDate = Math.min(
        ...trackedMessages.map((message) =>
            message.createdAt.getTime()
        ),
    );

    // Petite marge pour éviter de manquer une réponse proche de la date.
    const afterTimestamp = Math.floor(
        (oldestDate - 2 * 24 * 60 * 60 * 1000) / 1000,
    );

    const gmail = getGmailClient();

    const threads: gmail_v1.Schema$Thread[] = [];

    let pageToken: string | undefined;
    let pageCount = 0;

    do {
        const response = await gmail.users.threads.list({
            userId: "me",
            q: `in:sent after:${afterTimestamp}`,
            maxResults: 100,
            pageToken,
        });

        threads.push(...(response.data.threads ?? []));

        pageToken = response.data.nextPageToken ?? undefined;
        pageCount += 1;
    } while (pageToken && pageCount < 5);

    let importedCount = 0;

    for (const listedThread of threads) {
        const threadId = listedThread.id;

        if (!threadId) continue;

        const originalMessage = messageByThread.get(threadId);

        if (!originalMessage) continue;

        const threadResponse = await gmail.users.threads.get({
            userId: "me",
            id: threadId,
            format: "full",
        });

        const gmailMessages = threadResponse.data.messages ?? [];

        for (const gmailMessage of gmailMessages) {
            const gmailMessageId = gmailMessage.id;

            if (!gmailMessageId) continue;

            // Ne traiter que les messages réellement envoyés.
            if (!gmailMessage.labelIds?.includes("SENT")) {
                continue;
            }

            // Ignorer la notification initiale.
            if (
                gmailMessageId ===
                originalMessage.gmailNotificationId
            ) {
                continue;
            }

            // Éviter les doublons.
            const alreadyImported =
                await prisma.contactReply.findUnique({
                    where: {
                        gmailMessageId,
                    },
                    select: {
                        id: true,
                    },
                });

            if (alreadyImported) continue;

            const body = extractMessageBody(gmailMessage);

            if (!body.trim()) continue;

            const rfcMessageId = getHeader(
                gmailMessage,
                "Message-ID",
            );

            const sentDate = gmailMessage.internalDate
                ? new Date(Number(gmailMessage.internalDate))
                : new Date();

            try {
                await prisma.$transaction([
                    prisma.contactReply.create({
                        data: {
                            contactMessageId: originalMessage.id,
                            body,
                            channel: "GMAIL",
                            gmailMessageId,
                            gmailRfcMessageId: rfcMessageId,
                            createdAt: sentDate,
                        },
                    }),

                    prisma.contactMessage.update({
                        where: {
                            id: originalMessage.id,
                        },
                        data: {
                            status: "REPLIED",
                            read: true,
                        },
                    }),
                ]);

                importedCount += 1;
            } catch (error) {
                // Une synchronisation simultanée peut tenter
                // d'importer deux fois le même message.
                const prismaError = error as {
                    code?: string;
                };

                if (prismaError.code === "P2002") {
                    continue;
                }

                throw error;
            }
        }
    }

    return importedCount;
}
