import { z } from 'zod'

export const skillSchema = z.object({
    name: z.string().min(1, 'Requis'),
    percent: z.coerce.number().int().min(0).max(100),
    icon: z.string().min(1, 'Requis'),
    order: z.coerce.number().int().default(0),
})

export const qualitySchema = z.object({
    label: z.string().min(1, 'Requis'),
    order: z.coerce.number().int().default(0),
})

export const educationSchema = z.object({
    titre: z.string().min(1, 'Requis'),
    organisation: z.string().min(1, 'Requis'),
    lieu: z.string().min(1, 'Requis'),
    periode: z.string().min(1, 'Requis'),
    current: z.boolean().default(false),
    order: z.coerce.number().int().default(0),
})

export const experienceSchema = z.object({
    titre: z.string().min(1, 'Requis'),
    organisation: z.string().optional(),
    description: z.string().min(1, 'Requis'),
    periode: z.string().min(1, 'Requis'),
    current: z.boolean().default(false),
    order: z.coerce.number().int().default(0),
})

export const testimonialSchema = z.object({
    quote: z.string().min(1, 'Requis'),
    name: z.string().min(1, 'Requis'),
    poste: z.string().min(1, 'Requis'),
    photo: z.string().optional(),
    order: z.coerce.number().int().default(0),
})

export const schemas = {
    skills: skillSchema,
    qualities: qualitySchema,
    education: educationSchema,
    experience: experienceSchema,
    testimonials: testimonialSchema,
} as const

export type EntityKey = keyof typeof schemas