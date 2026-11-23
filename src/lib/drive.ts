/**
 * URL de téléchargement direct pour un fichier Google Drive.
 * Le fichier doit être partagé publiquement ("Toute personne disposant du lien").
 * ✅ Fonctionne pour les PDF, ZIP, etc. (déclenche le téléchargement).
 * ❌ Ne pas utiliser comme `src` d'une balise <img>.
 */
export function driveDownloadUrl(fileId: string): string {
    return `https://drive.google.com/uc?export=download&id=${fileId}`
}

/** Variante avec nom de fichier suggéré (utile pour les PDF) */
export function driveDownloadUrlWithName(fileId: string, filename: string): string {
    return `https://drive.google.com/uc?export=download&id=${fileId}&filename=${encodeURIComponent(filename)}`
}

/**
 * URL d'image optimisée pour l'affichage (balise <img> / next/image).
 * Utilise le CDN Googleusercontent, compatible avec next/image.
 * `sz` contrôle la largeur max retournée (en pixels).
 */
export function driveImageUrl(fileId: string, sz = 800): string {
    return `https://lh3.googleusercontent.com/d/${fileId}=w${sz}`
}