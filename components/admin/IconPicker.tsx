'use client'

import { useWatch, type Control, type FieldValues } from 'react-hook-form'
import { iconMap } from '@/lib/icon-map'

interface IconPickerProps {
    control: Control<FieldValues>
    name: string
    onChange: (value: string) => void
}

export default function IconPicker({ control, name, onChange }: IconPickerProps) {
    const value = useWatch({ control, name }) as string | undefined

    return (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8">
            {Object.entries(iconMap).map(([iconName, Icon]) => {
                const isSelected = value === iconName
                return (
                    <button
                        key={iconName}
                        type="button"
                        onClick={() => onChange(iconName)}
                        title={iconName}
                        aria-label={iconName}
                        aria-pressed={isSelected}
                        className={`group relative flex aspect-square items-center justify-center rounded-xl border-2 transition-all duration-200 ${isSelected
                                ? 'border-primary bg-primary/10 text-primary shadow-lg shadow-primary/20'
                                : 'border-border bg-bg-card text-text-secondary hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:text-primary'
                            }`}
                    >
                        <Icon className="h-7 w-7 transition-transform group-hover:scale-110" />
                        {isSelected && (
                            <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                            </span>
                        )}
                    </button>
                )
            })}
        </div>
    )
}