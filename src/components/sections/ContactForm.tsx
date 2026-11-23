'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormValues } from '@/lib/validations/contact'
import { sendContactEmail } from '@/app/actions/contact'
import { Button } from '@/components/ui/button'
import { CheckCircle, AlertCircle } from 'lucide-react'

export default function ContactForm() {
    const [serverState, setServerState] = useState<{
        success?: boolean
        message?: string
    }>({})

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    })

    const onSubmit = async (data: ContactFormValues) => {
        setServerState({})
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('message', data.message)
        formData.append('company', data.company ?? '')

        const result = await sendContactEmail(formData)
        setServerState(result)
        if (result.success) reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            {/* Honeypot caché */}
            <input
                type="text"
                {...register('company')}
                tabIndex={-1}
                autoComplete="off"
                className="absolute left-[-9999px]"
                aria-hidden="true"
            />

            <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-text-primary">
                    Nom complet
                </label>
                <input
                    id="name"
                    type="text"
                    {...register('name')}
                    className="w-full rounded-lg border border-border bg-bg-card px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-primary"
                    placeholder="Votre nom"
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-text-primary">
                    Adresse email
                </label>
                <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className="w-full rounded-lg border border-border bg-bg-card px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-primary"
                    placeholder="vous@exemple.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-text-primary">
                    Message
                </label>
                <textarea
                    id="message"
                    rows={5}
                    {...register('message')}
                    className="w-full resize-none rounded-lg border border-border bg-bg-card px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-primary"
                    placeholder="Décrivez votre projet ou votre demande..."
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
            </div>

            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
            </Button>

            {serverState.success && (
                <div className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-600 dark:text-green-400">
                    <CheckCircle className="h-4 w-4 shrink-0" />
                    {serverState.message ?? 'Message envoyé avec succès !'}
                </div>
            )}

            {serverState.success === false && (
                <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {serverState.message ?? 'Une erreur est survenue.'}
                </div>
            )}
        </form>
    )
}