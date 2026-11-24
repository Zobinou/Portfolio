'use client'

import { useEffect, useState } from 'react'

interface Msg {
    id: string; name: string; email: string;
    message: string; read: boolean; createdAt: string;
}

export default function MessagesPage() {
    const [items, setItems] = useState<Msg[]>([])
    const load = async () => setItems(await (await fetch('/api/admin/messages')).json())

    useEffect(() => {
        let active = true

        const loadItems = async () => {
            const data = await (await fetch('/api/admin/messages')).json()
            if (active) setItems(data)
        }

        void loadItems()
        return () => { active = false }
    }, [])

    const markRead = async (id: string, read: boolean) => {
        await fetch(`/api/admin/messages/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ read }),
        })
        load()
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-text-primary">Messages</h1>
            <div className="mt-6 space-y-3">
                {items.map((m) => (
                    <div
                        key={m.id}
                        className={`rounded-xl border p-4 ${m.read ? 'border-border bg-bg-card' : 'border-primary/40 bg-primary/5'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <p className="font-medium text-text-primary">
                                {m.name} · <span className="text-sm text-text-secondary">{m.email}</span>
                            </p>
                            <button onClick={() => markRead(m.id, !m.read)} className="text-xs text-primary">
                                {m.read ? 'Marquer non lu' : 'Marquer lu'}
                            </button>
                        </div>
                        <p className="mt-2 whitespace-pre-wrap text-sm text-text-secondary">{m.message}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}