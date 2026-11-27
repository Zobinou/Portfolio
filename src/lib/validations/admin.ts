import { z } from "zod"

export const projectSchema = z.object({
    slug: z.string().min(2),
    numero: z.string(),
    titre: z.string().min(1),
    description: z.string().min(1),
    descriptionLongue: z.string().min(1),
    image: z.string().url(),
    lien: z.string().url(),
    technologies: z.array(z.string()),
    drivePhotos: z.array(z.string().url()).default([]),
    featured: z.boolean().optional(),
    order: z.number().int().optional(),
})

export const skillSchema = z.object({
    name: z.string().min(1),
    percent: z.number().int().min(0).max(100),
    icon: z.string().min(1),
    order: z.number().int().optional(),
})

export const qualitySchema = z.object({
    label: z.string().min(1),
    order: z.number().optional(),
})

export const educationSchema = z.object({
    titre: z.string(), organisation: z.string(), lieu: z.string(),
    periode: z.string(), current: z.boolean().optional(), order: z.number().optional(),
})

export const experienceSchema = z.object({
    titre: z.string(), organisation: z.string().optional(), description: z.string(),
    periode: z.string(), current: z.boolean().optional(), order: z.number().optional(),
})

export const testimonialSchema = z.object({
    quote: z.string(), name: z.string(), poste: z.string(),
    photo: z.string().optional(), order: z.number().optional(),
})