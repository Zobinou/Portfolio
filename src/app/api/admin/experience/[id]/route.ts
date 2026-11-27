import { prisma } from '@/lib/prisma'
import { experienceSchema } from '@/lib/admin/config'
import { makeUpdateHandler, makeDeleteHandler } from '@/lib/admin/handlers'

export const PATCH = makeUpdateHandler(prisma.experience, experienceSchema)
export const DELETE = makeDeleteHandler(prisma.experience)