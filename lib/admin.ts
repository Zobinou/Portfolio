import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function requireAdmin() {
    const requestHeaders = await headers();

    const session = await auth.api.getSession({
        headers: requestHeaders,
    });

    if (!session) {
        return null;
    }

    const allowlist = (process.env.ADMIN_EMAILS ?? "")
        .split(",")
        .map((email) => email.trim().toLowerCase())
        .filter(Boolean);

    if (allowlist.length === 0) {
        return session;
    }

    const email = session.user.email?.toLowerCase() ?? "";

    if (!allowlist.includes(email)) {
        return null;
    }

    return session;
}