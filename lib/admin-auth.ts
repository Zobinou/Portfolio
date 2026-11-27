import "server-only";
import {
    createHash,
    createHmac,
    timingSafeEqual,
} from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_COOKIE_NAME = "portfolio_admin_session";

export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

export function verifyAdminPassword(password: string): boolean {
    const expectedPassword = process.env.ADMIN_PORTFOLIO_PASSWORD;

    if (!expectedPassword) {
        return false;
    }

    const passwordHash = createHash("sha256")
        .update(password, "utf8")
        .digest();

    const expectedHash = createHash("sha256")
        .update(expectedPassword, "utf8")
        .digest();

    return timingSafeEqual(passwordHash, expectedHash);
}

function getSessionSecret(): string {
    const secret = process.env.ADMIN_SESSION_SECRET;

    if (!secret) {
        throw new Error("ADMIN_SESSION_SECRET est manquant.");
    }

    return secret;
}

function signSession(payload: string): string {
    return createHmac("sha256", getSessionSecret())
        .update(payload)
        .digest("hex");
}

export function createAdminSessionToken(): string {
    const expiration = (
        Math.floor(Date.now() / 1000) + ADMIN_SESSION_MAX_AGE
    ).toString();

    const signature = signSession(expiration);

    return `${expiration}.${signature}`;
}

export function verifyAdminSession(token?: string): boolean {
    if (!token) return false;

    const parts = token.split(".");

    if (parts.length !== 2) return false;

    const [expiration, signature] = parts;

    if (
        !/^\d+$/.test(expiration) ||
        !/^[a-f0-9]{64}$/i.test(signature)
    ) {
        return false;
    }

    const expirationTime = Number(expiration);

    if (
        !Number.isSafeInteger(expirationTime) ||
        expirationTime <= Math.floor(Date.now() / 1000)
    ) {
        return false;
    }

    const expectedSignature = signSession(expiration);

    return timingSafeEqual(
        Buffer.from(signature, "hex"),
        Buffer.from(expectedSignature, "hex")
    );
}

export async function requireAdmin(): Promise<void> {
    const cookieStore = await cookies();

    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

    if (!verifyAdminSession(token)) {
        redirect("/");
    }
}