'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

if (typeof window !== 'undefined') {
  const originalError = console.error
  console.error = (...args: unknown[]) => {
    const first = typeof args[0] === 'string' ? args[0] : ''
    if (
      first.includes('Encountered a script tag while rendering React component')
    ) {
      return
    }
    originalError.apply(console, args)
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </NextThemesProvider>
  )
}