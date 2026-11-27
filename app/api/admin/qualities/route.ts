import { prisma } from '@/lib/prisma'
import { qualitySchema } from '@/lib/admin/config'
import { makeListHandler, makeCreateHandler } from '@/lib/admin/handlers'

export const GET = makeListHandler(prisma.quality)
export const POST = makeCreateHandler(prisma.quality, qualitySchema)