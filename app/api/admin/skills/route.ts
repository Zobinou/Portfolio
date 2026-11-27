import { prisma } from '@/lib/prisma'
import { skillSchema } from '@/lib/admin/config'
import { makeListHandler, makeCreateHandler } from '@/lib/admin/handlers'

export const GET = makeListHandler(
	prisma.skill as unknown as Parameters<typeof makeListHandler>[0],
)
export const POST = makeCreateHandler(
	prisma.skill as unknown as Parameters<typeof makeCreateHandler>[0],
	skillSchema,
)