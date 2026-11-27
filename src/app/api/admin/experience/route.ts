import { prisma } from '@/lib/prisma'
import { experienceSchema } from '@/lib/admin/config'
import { makeListHandler, makeCreateHandler } from '@/lib/admin/handlers'

export const GET = makeListHandler(prisma.experience)
export const POST = makeCreateHandler(prisma.experience, experienceSchema)