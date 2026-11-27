'use client'

import { useState } from 'react'
import { ImageIcon, X, Link as LinkIcon } from 'lucide-react'
import { driveThumbnail, isDriveUrl } from '@/lib/drive'
import { Button } from '@/components/ui/button'
import Image from "next/image"

interface Props {
    value: string[]
    onChange: (urls: string[]) => void
}

export default function DrivePhotosInput({ value, onChange }: Props) {
    const [input, setInput] = useState('')
    const [raw, setRaw] = useState(value.join('\n'))
    const [showBulk, setShowBulk] = useState(false)

    const addUrl = () => {
        const trimmed = input.trim()
        if (!trimmed) return
        if (!isDriveUrl(trimmed)) {
            alert('Lien Google Drive invalide (attendu : https://drive.google.com/file/d/...)')
            return
        }
        const next = [...value, trimmed]
        onChange(next)
        setRaw(next.join('\n'))
        setInput('')
    }

    const removeAt = (idx: number) => {
        const next = value.filter((_, i) => i !== idx)
        onChange(next)
        setRaw(next.join('\n'))
    }

    const handleBulkChange = (text: string) => {
        setRaw(text)
        const urls = text
            .split('\n')
            .map((s) => s.trim())
            .filter((s) => s && isDriveUrl(s))
        onChange(urls)
    }

    return (
        <div className="space-y-3">
            <div className="flex gap-2">
                <input
                    type="url"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault()
                            addUrl()
                        }
                    }}
                    placeholder="https://drive.google.com/file/d/…"
                    className="flex-1 rounded-lg border border-border bg-bg-card px-4 py-3 text-sm text-text-primary outline-none focus:border-primary"
                />
                <Button type="button" onClick={addUrl} variant="outline">
                    <LinkIcon className="mr-2 h-4 w-4" /> Ajouter
                </Button>
            </div>

            <button
                type="button"
                onClick={() => setShowBulk((s) => !s)}
                className="text-xs text-text-secondary underline-offset-2 hover:text-primary hover:underline"
            >
                {showBulk ? 'Masquer le collage en masse' : 'Coller plusieurs liens (un par ligne)'}
            </button>

            {showBulk && (
                <textarea
                    value={raw}
                    onChange={(e) => handleBulkChange(e.target.value)}
                    rows={4}
                    placeholder={'https://drive.google.com/file/d/AAA/view\nhttps://drive.google.com/file/d/BBB/view'}
                    className="w-full rounded-lg border border-border bg-bg-card px-4 py-2 text-xs text-text-primary outline-none focus:border-primary"
                />
            )}

            {value.length > 0 ? (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {value.map((url, idx) => {
                        const thumb = driveThumbnail(url, 400)
                        return (
                            <div
                                key={`${url}-${idx}`}
                                className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-bg-secondary"
                            >
                                {thumb ? (
                                    <Image
                                        src={thumb}
                                        alt={`Photo ${idx + 1}`}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-text-muted">
                                        <ImageIcon className="h-6 w-6" />
                                    </div>
                                )}
                                <button
                                    type="button"
                                    onClick={() => removeAt(idx)}
                                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                    aria-label="Supprimer cette photo"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <p className="text-xs text-text-muted">
                    Aucune photo Drive. Ajoutez un lien partagé Google Drive ci-dessus.
                </p>
            )}
        </div>
    )
}