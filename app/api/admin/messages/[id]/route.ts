import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

const updateSchema = z.object({
    read: z.boolean(),
});

export async function PATCH(
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

        const parsed = updateSchema.safeParse(await req.json());

        if (!parsed.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: parsed.error.flatten(),
                },
                { status: 400 },
            );
        }

        const message = await prisma.contactMessage.update({
            where: { id },
            data: {
                read: parsed.data.read,
            },
        });

        return NextResponse.json({
            success: true,
            message,
        });
    } catch (error) {
        console.error("[Admin Messages] Mise à jour impossible :", error);

        return NextResponse.json(
            {
                success: false,
                message: "Impossible de modifier ce message.",
            },
            { status: 500 },
        );
    }
}
