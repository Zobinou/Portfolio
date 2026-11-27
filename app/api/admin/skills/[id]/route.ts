import { prisma } from '@/lib/prisma'
import { skillSchema } from '@/lib/admin/config'
import { makeUpdateHandler, makeDeleteHandler } from '@/lib/admin/handlers'

export const PATCH = makeUpdateHandler(prisma.skill, skillSchema)
export const DELETE = makeDeleteHandler(prisma.skill)