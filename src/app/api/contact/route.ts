import { NextResponse } from "next/server"
import { Resend } from "resend"
import { prisma } from "@/lib/prisma"
import { contactSchema } from "@/lib/validations/contact"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    const json = await req.json()
    const parsed = contactSchema.safeParse(json)
    if (!parsed.success)
        return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

    if (parsed.data.company) return NextResponse.json({ success: true })

    const msg = await prisma.contactMessage.create({
        data: {
            name: parsed.data.name,
            email: parsed.data.email,
            message: parsed.data.message,
        },
    })

    const { error } = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [process.env.CONTACT_EMAIL!],
        replyTo: parsed.data.email,
        subject: `Nouveau message de ${parsed.data.name}`,
        html: `<h2>Nouveau message</h2><p><b>De :</b> ${parsed.data.name} &lt;${parsed.data.email}&gt;</p><p>${parsed.data.message}</p>`,
    })
    if (error) return NextResponse.json({ error: "Email failed" }, { status: 500 })

    return NextResponse.json({ success: true, id: msg.id })
}