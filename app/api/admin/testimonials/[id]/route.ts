import { prisma } from '@/lib/prisma'
import { testimonialSchema } from '@/lib/admin/config'
import { makeUpdateHandler, makeDeleteHandler } from '@/lib/admin/handlers'

export const PATCH = makeUpdateHandler(prisma.testimonial, testimonialSchema)
export const DELETE = makeDeleteHandler(prisma.testimonial)