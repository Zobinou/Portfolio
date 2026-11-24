'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Trash2, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Project {
    id: string; slug: string; titre: string; description: string;
}

export default function AdminProjects() {
    const [items, setItems] = useState<Project[]>([])

    const load = async () => {
        const res = await fetch('/api/admin/projects')
        setItems(await res.json())
    }
    useEffect(() => {
        let cancelled = false

        fetch('/api/admin/projects')
            .then((res) => res.json())
            .then((projects: Project[]) => {
                if (!cancelled) setItems(projects)
            })

        return () => { cancelled = true }
    }, [])

    const remove = async (id: string) => {
        if (!confirm('Supprimer ce projet ?')) return
        await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' })
        load()
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-text-primary">Projets</h1>
                <Link href="/admin/projects/new">
                    <Button><Plus className="mr-2 h-4 w-4" /> Ajouter</Button>
                </Link>
            </div>
            <div className="mt-6 space-y-2">
                {items.map((p) => (
                    <div key={p.id} className="flex items-center justify-between rounded-lg border border-border bg-bg-card p-4">
                        <div>
                            <p className="font-medium text-text-primary">{p.titre}</p>
                            <p className="text-xs text-text-muted">/{p.slug}</p>
                        </div>
                        <div className="flex gap-2">
                            <Link href={`/admin/projects/${p.id}`}>
                                <Button size="icon" variant="ghost"><Pencil className="h-4 w-4" /></Button>
                            </Link>
                            <Button size="icon" variant="ghost" onClick={() => remove(p.id)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                        </div>
                    </div>
                ))}
                {items.length === 0 && <p className="text-sm text-text-muted">Aucun projet pour l&apos;instant.</p>}
            </div>
        </div>
    )
}