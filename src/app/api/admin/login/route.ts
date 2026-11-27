import { NextResponse } from "next/server";
import {
    ADMIN_COOKIE_NAME,
    ADMIN_SESSION_MAX_AGE,
    createAdminSessionToken,
    verifyAdminPassword,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
    try {
        if (
            !process.env.ADMIN_PORTFOLIO_PASSWORD ||
            !process.env.ADMIN_SESSION_SECRET
        ) {
            console.error("Configuration Admin manquante.");

            return NextResponse.json(
                {
                    message: "Le service d'administration est mal configuré.",
                },
                { status: 500 }
            );
        }

        const body = await request.json();

        const password =
            typeof body?.password === "string"
                ? body.password
                : "";

        if (!password || !verifyAdminPassword(password)) {
            return NextResponse.json(
                { message: "Code d'accès incorrect." },
                { status: 401 }
            );
        }

        const token = createAdminSessionToken();

        const response = NextResponse.json({
            success: true,
            message: "Authentification réussie.",
        });

        response.cookies.set({
            name: ADMIN_COOKIE_NAME,
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: ADMIN_SESSION_MAX_AGE,
        });

        return response;

    } catch (error) {
        console.error("Erreur API Admin Login :", error);

        return NextResponse.json(
            {
                message: "Une erreur interne est survenue.",
            },
            { status: 500 }
        );
    }
}