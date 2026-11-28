import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { syncGmailSentReplies } from "@/lib/contact-gmail-sync";

export async function GET() {
    if (!(await requireAdmin())) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 },
        );
    }

    // Une indisponibilité de Gmail ne bloque jamais le Dashboard.
    try {
        await syncGmailSentReplies();
    } catch (error) {
        console.error(
            "[Admin Messages] Synchronisation Gmail impossible :",
            error,
        );
    }

    const messages = await prisma.contactMessage.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            replies: {
                orderBy: {
                    createdAt: "asc",
                },
            },
        },
    });

    return NextResponse.json(messages);
}
