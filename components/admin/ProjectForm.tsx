"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import type { FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
    projectSchema,
    PROJECT_TYPES,
    APPLICATION_TYPES,
} from "@/lib/validations/admin";

import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import DrivePhotosInput from "./DrivePhotosInput";

import {
    ArrowLeft,
    Save,
    Image as ImageIcon,
    Code2,
    FileText,
    AlertCircle,
    CheckCircle2,
    Loader2,
    Star,
    Hash,
    Globe,
    Layers3,
    Tags,
} from "lucide-react";

import Link from "next/link";

type Form = z.infer<typeof projectSchema>;

const inputClass =
    "flex w-full rounded-xl border border-border bg-bg-primary px-4 py-3 text-sm text-text-primary outline-none transition-all placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50";

const labelClass =
    "mb-2 block text-sm font-semibold text-text-primary";

const helperClass =
    "mt-1.5 text-xs leading-5 text-text-muted";

const projectTypeOptions: Record<
    (typeof PROJECT_TYPES)[number],
    string
> = {
    PERSONNEL: "Personnel",
    SCOLAIRE: "Scolaire",
    ENTREPRISE: "Entreprise",
    OPEN_SOURCE: "Open source",
    INSTITUTIONNEL: "Institutionnel",
};

const applicationTypeOptions: Record<
    (typeof APPLICATION_TYPES)[number],
    string
> = {
    WEB: "Application web",
    MOBILE: "Application mobile",
    DESKTOP: "Application desktop",
    API: "API / Backend",
    LIBRARY: "Bibliothèque / Package",
    GAME: "Jeu",
    ERP: "ERP",
    DATA: "Data",
    OTHER: "Autre",
};

function FieldErrorMessage({
    error,
}: {
    error?: FieldError;
}) {
    if (!error?.message) return null;

    return (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500">
            <AlertCircle size={13} />
            {String(error.message)}
        </p>
    );
}

export default function ProjectForm({
    initial,
    id,
}: {
    initial?: Partial<Form>;
    id?: string;
}) {
    const router = useRouter();

    const [apiError, setApiError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: {
            isSubmitting,
            errors,
        },
    } = useForm<Form>({
        resolver: zodResolver(projectSchema),

        defaultValues: {
            slug: "",
            numero: "",
            titre: "",
            description: "",
            descriptionLongue: "",
            image: "",
            lien: "",

            typeProjet: "PERSONNEL",
            typeApplication: "WEB",

            technologies: [],
            drivePhotos: [],
            featured: false,

            ...initial,
        },
    });

    const drivePhotos = useWatch({
        control,
        name: "drivePhotos",
    }) ?? [];

    const technologies = useWatch({
        control,
        name: "technologies",
    }) ?? [];

    const featured = useWatch({
        control,
        name: "featured",
    });

    const onSubmit = async (data: Form) => {
        setApiError(null);
        setSuccess(false);

        try {
            const url = id
                ? `/api/admin/projects/${id}`
                : "/api/admin/projects";

            const method = id ? "PATCH" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.status === 401) {
                const redirectPath = id
                    ? `/admin/projects/${id}`
                    : "/admin/projects/new";

                router.replace(
                    `/login?callbackUrl=${encodeURIComponent(redirectPath)}`
                );

                return;
            }

            if (!response.ok) {
                const result = await response.json().catch(() => null);

                const validationMessage =
                    result?.error?.formErrors?.[0] ??
                    Object.values(
                        result?.error?.fieldErrors ?? {}
                    )
                        .flat()
                        .find((message) => typeof message === "string");

                throw new Error(
                    result?.message ??
                    validationMessage ??
                    "Une erreur est survenue pendant l'enregistrement."
                );
            }

            setSuccess(true);

            router.push("/admin/projects");
            router.refresh();
        } catch (error) {
            setApiError(
                error instanceof Error
                    ? error.message
                    : "Impossible d'enregistrer le projet."
            );
        }
    };

    return (
        <div className="mx-auto w-full max-w-350 space-y-7 pb-10">
            <header className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                <div>
                    <Link
                        href="/admin/projects"
                        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-primary"
                    >
                        <ArrowLeft size={16} />
                        Retour aux projets
                    </Link>

                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <FileText size={23} />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                                {id
                                    ? "Modifier le projet"
                                    : "Nouveau projet"}
                            </h1>

                            <p className="mt-1 text-sm text-text-secondary">
                                {id
                                    ? "Mettez à jour les informations de votre réalisation."
                                    : "Présentez une nouvelle réalisation sur votre portfolio."}
                            </p>
                        </div>
                    </div>
                </div>
            </header>
            {apiError && (
                <div
                    role="alert"
                    className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-500"
                >
                    <AlertCircle
                        size={19}
                        className="mt-0.5 shrink-0"
                    />

                    <div>
                        <p className="font-semibold">
                            Échec de l&apos;enregistrement
                        </p>

                        <p className="mt-1">
                            {apiError}
                        </p>
                    </div>
                </div>
            )}

            {success && (
                <div
                    role="status"
                    className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-500"
                >
                    <CheckCircle2 size={19} />
                    Projet enregistré avec succès.
                </div>
            )}

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid items-start gap-6 lg:grid-cols-3"
            >
                <div className="space-y-6 lg:col-span-2">
                    <Card>
                        <CardHeader className="border-b border-border">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <FileText size={20} />
                                </div>

                                <div>
                                    <CardTitle>
                                        Informations générales
                                    </CardTitle>

                                    <CardDescription>
                                        Les informations principales de votre projet.
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-5 pt-6">

                            <div>
                                <label className={labelClass}>
                                    Titre du projet *
                                </label>

                                <input
                                    {...register("titre")}
                                    placeholder="Ex : Plateforme de gestion universitaire"
                                    className={inputClass}
                                />

                                <FieldErrorMessage error={errors.titre} />
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass}>
                                        Slug URL *
                                    </label>

                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                                            /
                                        </span>

                                        <input
                                            {...register("slug")}
                                            placeholder="mon-projet"
                                            className={`${inputClass} pl-8`}
                                        />
                                    </div>

                                    <FieldErrorMessage error={errors.slug} />

                                    <p className={helperClass}>
                                        Identifiant utilisé dans l&apos;URL du projet.
                                    </p>
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        Numéro d&apos;affichage
                                    </label>

                                    <input
                                        {...register("numero")}
                                        placeholder="01"
                                        className={inputClass}
                                    />

                                    <FieldErrorMessage error={errors.numero} />
                                </div>
                            </div>

                            <div className="border-t border-border pt-5">
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Layers3 size={18} />
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-bold text-text-primary">
                                            Classification du projet
                                        </h3>

                                        <p className="text-xs text-text-muted">
                                            Définissez le cadre et la nature de votre réalisation.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label className={labelClass}>
                                            Type de projet *
                                        </label>

                                        <select
                                            {...register("typeProjet")}
                                            className={inputClass}
                                        >
                                            {PROJECT_TYPES.map((type) => (
                                                <option
                                                    key={type}
                                                    value={type}
                                                >
                                                    {projectTypeOptions[type]}
                                                </option>
                                            ))}
                                        </select>

                                        <FieldErrorMessage
                                            error={errors.typeProjet}
                                        />

                                        <p className={helperClass}>
                                            Personnel, scolaire, entreprise, open source ou institutionnel.
                                        </p>
                                    </div>

                                    <div>
                                        <label className={labelClass}>
                                            Type d&apos;application *
                                        </label>

                                        <select
                                            {...register("typeApplication")}
                                            className={inputClass}
                                        >
                                            {APPLICATION_TYPES.map((type) => (
                                                <option
                                                    key={type}
                                                    value={type}
                                                >
                                                    {applicationTypeOptions[type]}
                                                </option>
                                            ))}
                                        </select>

                                        <FieldErrorMessage
                                            error={errors.typeApplication}
                                        />

                                        <p className={helperClass}>
                                            Web, mobile, desktop, API, bibliothèque ou autre.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Description courte *
                                </label>

                                <textarea
                                    {...register("description")}
                                    rows={3}
                                    placeholder="Présentez brièvement votre projet et sa valeur ajoutée..."
                                    className={`${inputClass} resize-y`}
                                />

                                <FieldErrorMessage
                                    error={errors.description}
                                />

                                <p className={helperClass}>
                                    Cette description sera utilisée dans la présentation du projet.
                                </p>
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Description détaillée *
                                </label>

                                <textarea
                                    {...register("descriptionLongue")}
                                    rows={7}
                                    placeholder="Décrivez le contexte, les objectifs, les fonctionnalités, les défis rencontrés et les solutions apportées..."
                                    className={`${inputClass} resize-y`}
                                />

                                <FieldErrorMessage
                                    error={errors.descriptionLongue}
                                />
                            </div>

                            <div className="flex items-start gap-3 rounded-xl border border-border bg-bg-primary p-4">
                                <input
                                    type="checkbox"
                                    {...register("featured")}
                                    id="featured"
                                    className="mt-1 h-4 w-4 accent-primary"
                                />

                                <label
                                    htmlFor="featured"
                                    className="cursor-pointer"
                                >
                                    <span className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                                        <Star
                                            size={15}
                                            className="text-amber-500"
                                        />
                                        Mettre ce projet en avant
                                    </span>

                                    <span className="mt-1 block text-xs leading-5 text-text-muted">
                                        Permet de distinguer ce projet dans votre portfolio.
                                    </span>
                                </label>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="border-b border-border">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <ImageIcon size={20} />
                                </div>

                                <div>
                                    <CardTitle>
                                        Images et médias
                                    </CardTitle>

                                    <CardDescription>
                                        Gérez les visuels associés à votre réalisation.
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-5 pt-6">
                            <div>
                                <label className={labelClass}>
                                    URL de l&apos;image principale *
                                </label>

                                <input
                                    {...register("image")}
                                    type="url"
                                    placeholder="https://example.com/project-cover.webp"
                                    className={inputClass}
                                />

                                <FieldErrorMessage error={errors.image} />

                                <p className={helperClass}>
                                    Utilisez une image accessible publiquement.
                                </p>
                            </div>

                            <div className="border-t border-border pt-5">
                                <label className={labelClass}>
                                    Galerie Google Drive
                                </label>

                                <p className="mb-4 text-xs text-text-muted">
                                    Ajoutez plusieurs images pour illustrer les différentes parties du projet.
                                </p>

                                <DrivePhotosInput
                                    value={drivePhotos}
                                    onChange={(urls) =>
                                        setValue("drivePhotos", urls, {
                                            shouldDirty: true,
                                            shouldValidate: true,
                                        })
                                    }
                                />

                                <FieldErrorMessage
                                    error={errors.drivePhotos as FieldError | undefined}
                                />

                                <p className="mt-3 text-xs text-text-muted">
                                    {drivePhotos.length} image(s) dans la galerie.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <aside className="space-y-6">

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Globe size={18} />
                                </div>

                                <div>
                                    <CardTitle className="text-base">
                                        Liens du projet
                                    </CardTitle>

                                    <CardDescription>
                                        Accès à votre réalisation.
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent>
                            <label className={labelClass}>
                                URL du projet en ligne *
                            </label>

                            <input
                                {...register("lien")}
                                type="url"
                                placeholder="https://github.com/..."
                                className={inputClass}
                            />

                            <FieldErrorMessage error={errors.lien} />

                            <p className={helperClass}>
                                Lien vers la démonstration ou le dépôt du projet.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Code2 size={18} />
                                </div>

                                <div>
                                    <CardTitle className="text-base">
                                        Technologies et tags
                                    </CardTitle>

                                    <CardDescription>
                                        Stack technique utilisée.
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent>
                            <label className={labelClass}>
                                Technologies utilisées *
                            </label>

                            <input
                                {...register("technologies", {
                                    setValueAs: (value: string | string[]) =>
                                        typeof value === "string"
                                            ? value
                                                .split(",")
                                                .map((technology) => technology.trim())
                                                .filter(Boolean)
                                            : value,
                                })}
                                placeholder="React, PHP, Ruby, Next.js..."
                                className={inputClass}
                            />

                            <FieldErrorMessage
                                error={errors.technologies as FieldError | undefined}
                            />

                            <p className={helperClass}>
                                Séparez chaque technologie par une virgule.
                            </p>

                            {technologies.length > 0 && (
                                <div className="mt-5 border-t border-border pt-4">
                                    <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-text-secondary">
                                        <Tags size={14} />
                                        Aperçu des tags ({technologies.length})
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {technologies.map((technology, index) => (
                                            <span
                                                key={`${technology}-${index}`}
                                                className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary"
                                            >
                                                {technology}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">
                                État du formulaire
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-text-secondary">
                                    Type d&apos;action
                                </span>

                                <span className="font-semibold text-text-primary">
                                    {id ? "Modification" : "Création"}
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-text-secondary">
                                    Projet vedette
                                </span>

                                <span
                                    className={`font-semibold ${featured
                                        ? "text-amber-500"
                                        : "text-text-primary"
                                        }`}
                                >
                                    {featured ? "Oui" : "Non"}
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-text-secondary">
                                    Technologies
                                </span>

                                <span className="font-semibold text-text-primary">
                                    {technologies.length} tag(s)
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-text-secondary">
                                    Galerie
                                </span>

                                <span className="font-semibold text-text-primary">
                                    {drivePhotos.length} image(s)
                                </span>
                            </div>

                            <div className="border-t border-border pt-4">
                                <div className="mb-3 flex items-center gap-2 text-xs text-text-muted">
                                    <Hash size={14} />
                                    Les champs marqués * sont obligatoires.
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="h-12 w-full"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Enregistrement...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            {id
                                                ? "Enregistrer les modifications"
                                                : "Créer le projet"}
                                        </>
                                    )}
                                </Button>

                                <Link
                                    href="/admin/projects"
                                    className="mt-3 flex h-10 items-center justify-center rounded-xl border border-border text-sm font-medium text-text-secondary transition-colors hover:bg-primary/5 hover:text-primary"
                                >
                                    Annuler
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </aside>
            </form>
        </div>
    );
}