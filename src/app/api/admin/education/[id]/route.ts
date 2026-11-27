import { prisma } from '@/lib/prisma'
import { educationSchema } from '@/lib/admin/config'
import { makeUpdateHandler, makeDeleteHandler } from '@/lib/admin/handlers'

export const PATCH = makeUpdateHandler(prisma.education, educationSchema)
export const DELETE = makeDeleteHandler(prisma.education)