export function extractDriveId(url: string): string | null {
    if (!url) return null
    const patterns = [
        /\/file\/d\/([a-zA-Z0-9_-]{20,})/,
        /[?&]id=([a-zA-Z0-9_-]{20,})/,
        /\/d\/([a-zA-Z0-9_-]{20,})/,
    ]
    for (const p of patterns) {
        const m = url.match(p)
        if (m) return m[1]
    }
    return null
}

export function driveThumbnail(url: string, size = 800): string | null {
    const id = extractDriveId(url)
    if (!id) return null
    return `https://drive.google.com/thumbnail?id=${id}&sz=w${size}`
}

export function isDriveUrl(url: string): boolean {
    return !!extractDriveId(url)
}