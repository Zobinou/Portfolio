import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().min(1, "Votre nom est requis").max(50),
    email: z.string().email("Adresse email invalide"),
    message: z
        .string()
        .min(10, "Le message doit contenir au moins 10 caractères")
        .max(2000),
    // Honeypot anti-bot : doit rester vide
    company: z.string().max(0, "Spam détecté").optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
