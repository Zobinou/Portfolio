import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    if (!pathname.startsWith("/admin")) return NextResponse.next();

    const cookie = getSessionCookie(req);
    if (!cookie) {
        const url = new URL("/login", req.url);
        url.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };