import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin"
import { projectSchema } from "@/lib/validations/admin"

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const { id } = await params
    const parsed = projectSchema.partial().safeParse(await req.json())
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    return NextResponse.json(await prisma.project.update({ where: { id }, data: parsed.data }))
}

export async function DELETE(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const { id } = await params
    await prisma.project.delete({ where: { id } })
    return NextResponse.json({ ok: true })
}