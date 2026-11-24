'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { projectSchema } from '@/lib/validations/admin'
import { z } from 'zod'
import { Button } from '@/components/ui/button'

type Form = z.infer<typeof projectSchema>

export default function ProjectForm({ initial, id }: { initial?: Partial<Form>; id?: string }) {
    const router = useRouter()
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<Form>({
        resolver: zodResolver(projectSchema),
        defaultValues: { technologies: [], ...initial },
    })

    const onSubmit = async (data: Form) => {
        const url = id ? `/api/admin/projects/${id}` : '/api/admin/projects'
        const method = id ? 'PATCH' : 'POST'
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        if (res.ok) router.push('/admin/projects')
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-4">
            <input {...register('titre')} placeholder="Titre" className="input" />
            <input {...register('slug')} placeholder="Slug" className="input" />
            <input {...register('numero')} placeholder="Numéro" className="input" />
            <textarea {...register('description')} placeholder="Description courte" className="input" />
            <textarea {...register('descriptionLongue')} placeholder="Description longue" className="input" rows={4} />
            <input {...register('image')} placeholder="URL image" className="input" />
            <input {...register('lien')} placeholder="URL projet" className="input" />
            <input
                {...register('technologies', {
                    setValueAs: (v) => typeof v === 'string' ? v.split(',').map((s) => s.trim()) : v,
                })}
                placeholder="React, Next.js, TS"
                className="input"
            />
            <Button type="submit" disabled={isSubmitting}>
                {id ? 'Enregistrer' : 'Créer'}
            </Button>
        </form>
    )
}