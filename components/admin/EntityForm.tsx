'use client'

import { useRouter } from 'next/navigation'
import { useForm, type FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { schemas, type EntityKey } from '@/lib/admin/config'
import { ArrowLeft, Save, X } from 'lucide-react'
import Link from 'next/link'
import IconPicker from './IconPicker'

type FieldType = 'text' | 'number' | 'textarea' | 'checkbox' | 'icon'

interface Field {
    name: string
    label: string
    type: FieldType
    required?: boolean
    placeholder?: string
}

interface Props {
    entity: EntityKey
    title: string
    fields: Field[]
    defaults: Record<string, unknown>
    initial?: Record<string, unknown>
    id?: string
}

const inputClass = "flex w-full rounded-xl border border-border bg-bg-card px-4 py-3 text-sm text-text-primary outline-none transition-all placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
const labelClass = "mb-2 block text-sm font-semibold text-text-primary"

export default function EntityForm({ entity, title, fields, defaults, initial, id }: Props) {
    const router = useRouter()
    const schema = schemas[entity]

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<FieldValues>({
        resolver: zodResolver(schema),
        defaultValues: { ...defaults, ...initial },
    })

    const onSubmit = async (data: FieldValues) => {
        const url = id ? `/api/admin/${entity}/${id}` : `/api/admin/${entity}`
        const res = await fetch(url, {
            method: id ? 'PATCH' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        if (res.ok) router.push(`/admin/${entity}`)
    }

    return (
        <div className="mx-auto flex w-full max-w-[1600px] flex-col px-4 py-6 md:px-8 lg:px-10">
            <div className="sticky top-0 z-10 -mx-4 mb-8 flex flex-col items-start justify-between gap-4 border-b border-border/40 bg-bg-primary/80 px-4 py-4 backdrop-blur-md sm:flex-row sm:items-center md:-mx-8 md:px-8 lg:-mx-10 lg:px-10">
                <div>
                    <Link
                        href={`/admin/${entity}`}
                        className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-primary"
                    >
                        <ArrowLeft className="h-4 w-4" /> Retour à la liste
                    </Link>
                    <h1 className="font-display text-2xl font-bold text-text-primary md:text-3xl">
                        {id ? `${title}` : `${title}`}
                    </h1>
                </div>
                <div className="flex w-full items-center gap-3 sm:w-auto">
                    <Button 
                        variant="outline" 
                        onClick={() => router.back()} 
                        className="w-full sm:w-auto rounded-xl"
                    >
                        <X className="mr-2 h-4 w-4" /> Annuler
                    </Button>
                    <Button 
                        onClick={handleSubmit(onSubmit)} 
                        disabled={isSubmitting} 
                        className="w-full sm:w-auto rounded-xl"
                    >
                        <Save className="mr-2 h-4 w-4" />
                        {isSubmitting ? 'Enregistrement...' : id ? 'Sauvegarder' : 'Créer'}
                    </Button>
                </div>
            </div>

            <Card className="border-border/60 shadow-sm">
                <CardHeader className="border-b border-border/40 pb-6">
                    <CardTitle>Détails de l&apos;élément</CardTitle>
                    <CardDescription>
                        Remplissez les informations ci-dessous pour configurer cet élément.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-x-6 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
                        {fields.map((field) => {
                            const isFullWidth = field.type === 'textarea' || field.type === 'icon';
                            
                            return (
                                <div 
                                    key={field.name} 
                                    className={isFullWidth ? 'md:col-span-2 lg:col-span-3' : ''}
                                >
                                    <label className={labelClass}>
                                        {field.label}
                                        {field.required && <span className="ml-1 text-red-500">*</span>}
                                    </label>

                                    {field.type === 'textarea' ? (
                                        <textarea
                                            {...register(field.name)}
                                            rows={5}
                                            placeholder={field.placeholder}
                                            className={`${inputClass} resize-y`}
                                        />
                                    ) : field.type === 'checkbox' ? (
                                        <div className="flex h-11.5 items-center gap-3 rounded-xl border border-border bg-bg-card px-4">
                                            <input
                                                type="checkbox"
                                                {...register(field.name)}
                                                className="h-5 w-5 rounded border-border text-primary focus:ring-primary"
                                            />
                                            <span className="text-sm text-text-secondary">Activer cette option</span>
                                        </div>
                                    ) : field.type === 'icon' ? (
                                        <div className="rounded-xl border border-border bg-bg-card p-5">
                                            <IconPicker
                                                control={control}
                                                name={field.name}
                                                onChange={(iconName) =>
                                                    setValue(field.name, iconName, { shouldDirty: true })
                                                }
                                            />
                                        </div>
                                    ) : (
                                        <input
                                            type={field.type}
                                            step={field.type === 'number' ? 'any' : undefined}
                                            {...register(field.name)}
                                            placeholder={field.placeholder}
                                            className={inputClass}
                                        />
                                    )}

                                    {errors[field.name] && (
                                        <p className="mt-1.5 text-xs font-medium text-red-500">
                                            {String(errors[field.name]?.message ?? 'Champ invalide')}
                                        </p>
                                    )}
                                </div>
                            )
                        })}
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}