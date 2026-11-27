import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin'
import { z } from 'zod'

interface Listable {
    findMany: (args: { orderBy: { order: 'asc' } }) => PromiseLike<unknown[]>
}

interface Creatable<TData> {
    create: (args: { data: TData }) => PromiseLike<unknown>
}

interface Updatable<TData> {
    update: (args: { where: { id: string }; data: Partial<TData> }) => PromiseLike<unknown>
}

interface Deletable {
    delete: (args: { where: { id: string } }) => PromiseLike<unknown>
}

export function makeListHandler(delegate: Listable) {
    return async () => {
        if (!(await requireAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        return NextResponse.json(await delegate.findMany({ orderBy: { order: 'asc' } }))
    }
}

export function makeCreateHandler<TSchema extends z.ZodObject<z.ZodRawShape>>(
    delegate: Creatable<z.infer<TSchema>>,
    schema: TSchema,
) {
    return async (req: Request) => {
        if (!(await requireAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        const parsed = schema.safeParse(await req.json())
        if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
        return NextResponse.json(await delegate.create({ data: parsed.data }), { status: 201 })
    }
}

export function makeUpdateHandler<TSchema extends z.ZodObject<z.ZodRawShape>>(
    delegate: Updatable<z.infer<TSchema>>,
    schema: TSchema,
) {
    return async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
        if (!(await requireAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        const { id } = await params
        const parsed = schema.partial().safeParse(await req.json())
        if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
        return NextResponse.json(await delegate.update({ where: { id }, data: parsed.data as Partial<z.infer<TSchema>> }))
    }
}

export function makeDeleteHandler(delegate: Deletable) {
    return async (_: Request, { params }: { params: Promise<{ id: string }> }) => {
        if (!(await requireAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        const { id } = await params
        await delegate.delete({ where: { id } })
        return NextResponse.json({ ok: true })
    }
}