import { prisma } from '@/lib/prisma'
import { testimonialSchema } from '@/lib/admin/config'
import { makeListHandler, makeCreateHandler } from '@/lib/admin/handlers'

export const GET = makeListHandler(prisma.testimonial)
export const POST = makeCreateHandler(prisma.testimonial, testimonialSchema)