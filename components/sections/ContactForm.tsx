"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Send,
    LoaderCircle,
    CheckCircle2,
    AlertCircle,
    AlertTriangle,
    User,
    Mail,
    MessageSquare,
} from "lucide-react";

import {
    contactSchema,
    type ContactFormValues,
} from "@/lib/validations/contact";

import { Button } from "@/components/ui/button";

const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 2000;

export default function ContactForm() {
    const [serverState, setServerState] = useState<{
        success?: boolean;
        message?: string;
    }>({});

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
            company: "",
        },
    });

    const messageValue = useWatch({ control, name: "message" }) ?? "";
    const messageLength = messageValue.trim().length;

    const isMessageIncomplete =
        messageValue.length > 0 &&
        messageLength < MIN_MESSAGE_LENGTH;

    const charactersRemaining = Math.max(
        0,
        MIN_MESSAGE_LENGTH - messageLength,
    );

    const fieldClass =
        "w-full rounded-xl border border-border/70 bg-bg-secondary/40 px-4 py-3.5 text-sm text-text-primary outline-none transition-all duration-300 placeholder:text-text-secondary/50 hover:border-primary/30 focus:border-primary focus:bg-bg-card focus:ring-4 focus:ring-primary/10";

    const labelClass =
        "mb-2.5 block text-sm font-semibold text-text-primary";

    const onSubmit = async (data: ContactFormValues) => {
        setServerState({});

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message ??
                    "Impossible d'envoyer votre message.",
                );
            }

            setServerState({
                success: true,
                message:
                    result.message ??
                    "Votre message a bien été reçu.",
            });

            reset();
        } catch (error) {
            setServerState({
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Impossible d'envoyer votre message pour le moment. Veuillez réessayer.",
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative space-y-5"
            noValidate
        >
            {/* Honeypot anti-bot */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
            >
                <label htmlFor="company">
                    Entreprise
                </label>

                <input
                    id="company"
                    type="text"
                    {...register("company")}
                    tabIndex={-1}
                    autoComplete="off"
                />
            </div>

            {/* Nom */}
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
                    maxLength={50}
                    placeholder="Ex. : Jack Sparrow"
                    aria-invalid={!!errors.name}
                    aria-describedby={
                        errors.name ? "name-error" : undefined
                    }
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

            {/* Email */}
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
                    aria-describedby={
                        errors.email ? "email-error" : undefined
                    }
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

            {/* Message */}
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
                    maxLength={MAX_MESSAGE_LENGTH}
                    placeholder="Présentez votre projet, votre demande ou votre proposition de collaboration..."
                    aria-invalid={!!errors.message}
                    aria-describedby={[
                        errors.message ? "message-error" : null,
                        isMessageIncomplete ? "message-warning" : null,
                        "message-counter",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    {...register("message")}
                    className={`${fieldClass} min-h-40 resize-y leading-7 ${errors.message
                        ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/10"
                        : isMessageIncomplete
                            ? "border-amber-500/50 focus:border-amber-500 focus:ring-amber-500/10"
                            : ""
                        }`}
                />

                {/* Warning : message incomplet */}
                {isMessageIncomplete && (
                    <div
                        id="message-warning"
                        role="status"
                        className="mt-3 flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/10 p-3.5 text-xs text-amber-600 dark:text-amber-400"
                    >
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

                        <div>
                            <p className="font-bold">
                                Votre message semble incomplet.
                            </p>

                            <p className="mt-1 leading-relaxed">
                                Veuillez ajouter encore{" "}
                                <strong>
                                    {charactersRemaining} caractère
                                    {charactersRemaining > 1 ? "s" : ""}
                                </strong>{" "}
                                minimum avant de pouvoir envoyer votre message.
                            </p>
                        </div>
                    </div>
                )}

                {/* Erreur de validation */}
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

                {/* Compteur de caractères */}
                <div
                    id="message-counter"
                    className="mt-2 flex items-center justify-between gap-3 text-[11px]"
                >
                    <span className="text-text-muted">
                        Minimum : {MIN_MESSAGE_LENGTH} caractères
                    </span>

                    <span
                        className={`font-medium tabular-nums ${isMessageIncomplete
                            ? "text-amber-500"
                            : messageLength > 0
                                ? "text-emerald-500"
                                : "text-text-muted"
                            }`}
                    >
                        {messageLength}/{MAX_MESSAGE_LENGTH}
                    </span>
                </div>
            </div>

            {/* Bouton d'envoi */}
            <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="group h-13 w-full gap-3 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/30 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isSubmitting ? (
                    <>
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Enregistrement en cours...
                    </>
                ) : (
                    <>
                        Envoyer mon message
                        <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    </>
                )}
            </Button>

            {/* Retour serveur */}
            <div aria-live="polite" aria-atomic="true">
                {serverState.success === true && (
                    <div
                        role="status"
                        className="flex items-start gap-3 rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-600 dark:text-green-400"
                    >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />

                        <div>
                            <p className="font-bold">
                                Message reçu avec succès !
                            </p>

                            <p className="mt-1 leading-relaxed">
                                {serverState.message}
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
                            <p className="font-bold">
                                Échec de l&apos;envoi
                            </p>

                            <p className="mt-1 leading-relaxed">
                                {serverState.message}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <p className="text-center text-[11px] leading-relaxed text-text-secondary/70">
                Votre message sera d&apos;abord enregistré dans notre
                système de messagerie afin de garantir son suivi.
            </p>
        </form>
    );
}