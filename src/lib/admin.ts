import { headers } from "next/headers"
import { auth } from "@/lib/auth"

export async function requireAdmin() {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) return null
    const allowed = process.env.ADMIN_GITHUB_USERNAME?.toLowerCase()
    if (allowed) {
        const name = session.user.name?.toLowerCase() ?? ""
        const email = session.user.email?.toLowerCase() ?? ""
        if (!name.includes(allowed) && !email.includes(allowed)) return null
    }
    return session
}