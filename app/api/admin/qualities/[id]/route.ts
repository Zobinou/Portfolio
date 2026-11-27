import { prisma } from '@/lib/prisma'
import { qualitySchema } from '@/lib/admin/config'
import { makeUpdateHandler, makeDeleteHandler } from '@/lib/admin/handlers'

export const PATCH = makeUpdateHandler(prisma.quality, qualitySchema)
export const DELETE = makeDeleteHandler(prisma.quality)