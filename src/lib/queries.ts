import { prisma } from "@/lib/prisma"

export const queries = {
    projects: () => prisma.project.findMany({ orderBy: { order: "asc" } }),
    project: (slug: string) => prisma.project.findUnique({ where: { slug } }),
    skills: () => prisma.skill.findMany({ orderBy: { order: "asc" } }),
    qualities: () => prisma.quality.findMany({ orderBy: { order: "asc" } }),
    education: () => prisma.education.findMany({ orderBy: { order: "asc" } }),
    experience: () => prisma.experience.findMany({ orderBy: { order: "asc" } }),
    testimonials: () => prisma.testimonial.findMany({ orderBy: { order: "asc" } }),
}