import { prisma } from '@/lib/prisma'
import { educationSchema } from '@/lib/admin/config'
import { makeListHandler, makeCreateHandler } from '@/lib/admin/handlers'

export const GET = makeListHandler(prisma.education)
export const POST = makeCreateHandler(prisma.education, educationSchema)