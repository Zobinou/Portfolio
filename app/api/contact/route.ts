import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations/contact";
import {
    isGmailConfigured,
    sendContactNotification,
} from "@/lib/gmail";

export async function POST(req: Request) {
    try {
        const body: unknown = await req.json();

        if (
            !body ||
            typeof body !== "object" ||
            Array.isArray(body)
        ) {
            return NextResponse.json(
                { success: false, message: "Données invalides." },
                { status: 400 },
            );
        }

        const payload = body as Record<string, unknown>;

        if (
            typeof payload.company === "string" &&
            payload.company.trim() !== ""
        ) {
            return NextResponse.json({
                success: true,
                message: "Merci pour votre message.",
            });
        }

        const parsed = contactSchema.safeParse(payload);

        if (!parsed.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: parsed.error.flatten(),
                    message: "Veuillez vérifier les champs du formulaire.",
                },
                { status: 400 },
            );
        }

        const { name, email, message } = parsed.data;

        const savedMessage = await prisma.contactMessage.create({
            data: {
                name,
                email,
                message,
                status: "NEW",
                read: false,
                emailNotificationStatus: "PENDING",
            },
            select: {
                id: true,
                name: true,
                email: true,
                message: true,
                createdAt: true,
            },
        });

        if (!isGmailConfigured()) {
            await prisma.contactMessage.update({
                where: {
                    id: savedMessage.id,
                },
                data: {
                    emailNotificationStatus: "FAILED",
                },
            });

            return NextResponse.json(
                {
                    success: true,
                    id: savedMessage.id,
                    notificationSent: false,
                    message:
                        "Votre message a bien été enregistré. Il est disponible dans notre boîte de réception.",
                },
                { status: 201 },
            );
        }

        try {
            const notification = await sendContactNotification(
                savedMessage,
            );

            await prisma.contactMessage.update({
                where: {
                    id: savedMessage.id,
                },
                data: {
                    emailNotificationStatus: "SENT",
                    gmailThreadId: notification.threadId,
                    gmailNotificationId: notification.messageId,
                    gmailRfcMessageId: notification.rfcMessageId,
                    gmailSubject: notification.subject,
                },
            });

            return NextResponse.json(
                {
                    success: true,
                    id: savedMessage.id,
                    notificationSent: true,
                    message:
                        "Votre message a bien été reçu. Merci pour votre prise de contact !",
                },
                { status: 201 },
            );
        } catch (emailError) {
            console.error(
                "[Contact] Notification Gmail impossible :",
                emailError,
            );

            await prisma.contactMessage.update({
                where: {
                    id: savedMessage.id,
                },
                data: {
                    emailNotificationStatus: "FAILED",
                },
            });

            return NextResponse.json(
                {
                    success: true,
                    id: savedMessage.id,
                    notificationSent: false,
                    message:
                        "Votre message a bien été enregistré. Vous recevrez une réponse dès que possible.",
                },
                { status: 201 },
            );
        }
    } catch (error) {
        console.error("[Contact API] Erreur :", error);

        return NextResponse.json(
            {
                success: false,
                message:
                    "Impossible d'enregistrer votre message pour le moment. Veuillez réessayer.",
            },
            { status: 500 },
        );
    }
}
