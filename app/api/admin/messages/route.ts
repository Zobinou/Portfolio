import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin"

export async function GET() {
    if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    return NextResponse.json(
        await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } })
    )
}