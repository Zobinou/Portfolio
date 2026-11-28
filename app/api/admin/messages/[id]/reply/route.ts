
import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { sendContactReply } from "@/lib/gmail";

const replySchema = z.object({
    body: z.string().trim().min(1, "La réponse est obligatoire.").max(10000),
});

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    if (!(await requireAdmin())) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 },
        );
    }

    try {
        const { id } = await params;

        const json: unknown = await req.json();

        const parsed = replySchema.safeParse(json);

        if (!parsed.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: "La réponse est invalide.",
                    error: parsed.error.flatten(),
                },
                { status: 400 },
            );
        }

        const contactMessage = await prisma.contactMessage.findUnique({
            where: {
                id,
            },
            include: {
                replies: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    take: 1,
                },
            },
        });

        if (!contactMessage) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Ce message n'existe pas.",
                },
                { status: 404 },
            );
        }

        const latestReply = contactMessage.replies[0];

        const subject =
            contactMessage.gmailSubject ??
            `Nouveau message de ${contactMessage.name}`;

        // Envoi Gmail avant la sauvegarde de la réponse.
        const sent = await sendContactReply({
            to: contactMessage.email,
            name: contactMessage.name,
            body: parsed.data.body,
            subject,
            threadId: contactMessage.gmailThreadId,
            originalRfcMessageId: contactMessage.gmailRfcMessageId,
            latestRfcMessageId: latestReply?.gmailRfcMessageId,
        });

        // Après confirmation de Gmail, sauvegarder la réponse.
        const [reply] = await prisma.$transaction([
            prisma.contactReply.create({
                data: {
                    contactMessageId: contactMessage.id,
                    body: parsed.data.body,
                    channel: "DASHBOARD",
                    gmailMessageId: sent.messageId,
                    gmailRfcMessageId: sent.rfcMessageId,
                },
            }),

            prisma.contactMessage.update({
                where: {
                    id: contactMessage.id,
                },
                data: {
                    status: "REPLIED",
                    read: true,
                    ...(sent.threadId
                        ? { gmailThreadId: sent.threadId }
                        : {}),
                },
            }),
        ]);

        return NextResponse.json({
            success: true,
            message: "Votre réponse a été envoyée avec succès.",
            reply,
        });
    } catch (error) {
        console.error("[Admin Reply] Erreur :", error);

        return NextResponse.json(
            {
                success: false,
                message:
                    "Impossible d'envoyer la réponse par Gmail. Vérifiez la configuration Gmail et réessayez.",
            },
            { status: 500 },
        );
    }
}
