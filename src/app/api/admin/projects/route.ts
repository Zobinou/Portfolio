import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin"
import { projectSchema } from "@/lib/validations/admin"

export async function GET() {
    if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    return NextResponse.json(await prisma.project.findMany({ orderBy: { order: "asc" } }))
}

export async function POST(req: Request) {
    if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const parsed = projectSchema.safeParse(await req.json())
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    return NextResponse.json(await prisma.project.create({ data: parsed.data }), { status: 201 })
}