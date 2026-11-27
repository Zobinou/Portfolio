'use server'

import { Resend } from 'resend'
import { contactSchema } from '@/lib/validations/contact'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(formData: FormData) {
    const raw = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        company: formData.get('company'),
    }

    const parsed = contactSchema.safeParse(raw)
    if (!parsed.success) {
        return {
            success: false,
            errors: parsed.error.flatten().fieldErrors,
        }
    }

    // Honeypot : si rempli, on fait semblant que tout va bien
    if (parsed.data.company) {
        return { success: true }
    }

    try {
        const { error } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: [process.env.CONTACT_EMAIL!],
            replyTo: parsed.data.email,
            subject: `Nouveau message de ${parsed.data.name}`,
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px;">
                <h2 style="color: #14b8a6;">Nouveau message depuis le portfolio</h2>
                <p><strong>Nom :</strong> ${parsed.data.name}</p>
                <p><strong>Email :</strong> ${parsed.data.email}</p>
                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                <p><strong>Message :</strong></p>
                <p style="white-space: pre-wrap;">${parsed.data.message}</p>
            </div>
            `,
        })

        if (error) {
            console.error('Resend error:', error)
            return { success: false, message: "Erreur lors de l'envoi. Réessayez plus tard." }
        }

        return { success: true, message: 'Message envoyé avec succès !' }
    } catch (err) {
        console.error('Contact action error:', err)
        return { success: false, message: "Une erreur est survenue. Réessayez plus tard." }
    }
}