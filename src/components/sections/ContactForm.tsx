"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Send,
    LoaderCircle,
    CheckCircle2,
    AlertCircle,
    User,
    Mail,
    MessageSquare,
} from "lucide-react";

import {
    contactSchema,
    type ContactFormValues,
} from "@/lib/validations/contact";

import { sendContactEmail } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
    const [serverState, setServerState] = useState<{
        success?: boolean;
        message?: string;
    }>({});

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const fieldClass =
        "w-full rounded-xl border border-border/70 bg-bg-secondary/40 px-4 py-3.5 text-sm text-text-primary outline-none transition-all duration-300 placeholder:text-text-secondary/50 hover:border-primary/30 focus:border-primary focus:bg-bg-card focus:ring-4 focus:ring-primary/10";

    const labelClass =
        "mb-2.5 block text-sm font-semibold text-text-primary";

    const onSubmit = async (data: ContactFormValues) => {
        setServerState({});

        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("message", data.message);
        formData.append("company", data.company ?? "");

        try {
            const result = await sendContactEmail(formData);

            setServerState(result);

            if (result.success) {
                reset();
            }
        } catch {
            setServerState({
                success: false,
                message:
                    "Impossible d'envoyer votre message pour le moment. Veuillez réessayer.",
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative space-y-5"
            noValidate
        >
            <input
                type="text"
                {...register("company")}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="sr-only"
            />

            <div>
                <label htmlFor="name" className={labelClass}>
                    <span className="inline-flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        Nom complet
                    </span>
                </label>

                <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Ex. : Jean Dupont"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    {...register("name")}
                    className={`${fieldClass} ${errors.name
                            ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/10"
                            : ""
                        }`}
                />

                {errors.name && (
                    <p
                        id="name-error"
                        role="alert"
                        className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500"
                    >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="email" className={labelClass}>
                    <span className="inline-flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary" />
                        Adresse email
                    </span>
                </label>

                <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="vous@exemple.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email")}
                    className={`${fieldClass} ${errors.email
                            ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/10"
                            : ""
                        }`}
                />

                {errors.email && (
                    <p
                        id="email-error"
                        role="alert"
                        className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500"
                    >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="message" className={labelClass}>
                    <span className="inline-flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-primary" />
                        Votre message
                    </span>
                </label>

                <textarea
                    id="message"
                    rows={6}
                    placeholder="Présentez votre projet, votre demande ou votre proposition de collaboration..."
                    aria-invalid={!!errors.message}
                    aria-describedby={
                        errors.message ? "message-error" : undefined
                    }
                    {...register("message")}
                    className={`${fieldClass} min-h-40 resize-y leading-7 ${errors.message
                            ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/10"
                            : ""
                        }`}
                />

                {errors.message && (
                    <p
                        id="message-error"
                        role="alert"
                        className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500"
                    >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        {errors.message.message}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="group h-13 w-full gap-3 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/30 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isSubmitting ? (
                    <>
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Envoi en cours...
                    </>
                ) : (
                    <>
                        Envoyer mon message
                        <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    </>
                )}
            </Button>

            <div aria-live="polite" aria-atomic="true">
                {serverState.success === true && (
                    <div
                        role="status"
                        className="flex items-start gap-3 rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-600 dark:text-green-400"
                    >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />

                        <div>
                            <p className="font-bold">Message envoyé avec succès !</p>

                            <p className="mt-1 leading-relaxed">
                                {serverState.message ?? "Merci pour votre message."}
                            </p>
                        </div>
                    </div>
                )}

                {serverState.success === false && (
                    <div
                        role="alert"
                        className="flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400"
                    >
                        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

                        <div>
                            <p className="font-bold">Échec de l&apos;envoi</p>

                            <p className="mt-1 leading-relaxed">
                                {serverState.message ?? "Une erreur est survenue."}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <p className="text-center text-[11px] leading-relaxed text-text-secondary/70">
                En envoyant ce formulaire, votre message sera transmis
                pour traitement de votre demande.
            </p>
        </form>
    );
}