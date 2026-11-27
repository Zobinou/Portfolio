import { connection } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export async function GET() {
    try {
        await connection();

        const session = await requireAdmin();

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const [
            projects,
            skills,
            qualities,
            education,
            experience,
            testimonials,
        ] = await Promise.all([
            prisma.project.findMany({
                orderBy: {
                    order: "asc",
                },
                select: {
                    id: true,
                    titre: true,
                    slug: true,
                    description: true,
                    numero: true,
                    technologies: true,
                    featured: true,
                },
            }),

            prisma.skill.count(),
            prisma.quality.count(),
            prisma.education.count(),
            prisma.experience.count(),
            prisma.testimonial.count(),
        ]);

        const technologyMap: Record<string, number> = {};

        projects.forEach((project) => {
            project.technologies.forEach((technology) => {
                const name = technology.trim();

                if (name) {
                    technologyMap[name] =
                        (technologyMap[name] || 0) + 1;
                }
            });
        });

        const technologies = Object.entries(technologyMap)
            .map(([name, count]) => ({
                name,
                count,
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 7);

        const featuredProjects = projects.filter(
            (project) => project.featured
        ).length;

        return NextResponse.json(
            {
                stats: {
                    projects: projects.length,
                    featuredProjects,
                    skills,
                    qualities,
                    education,
                    experience,
                    testimonials,
                },

                distribution: [
                    {
                        name: "Projets",
                        value: projects.length,
                    },
                    {
                        name: "Compétences",
                        value: skills,
                    },
                    {
                        name: "Qualités",
                        value: qualities,
                    },
                    {
                        name: "Formations",
                        value: education,
                    },
                    {
                        name: "Expériences",
                        value: experience,
                    },
                    {
                        name: "Témoignages",
                        value: testimonials,
                    },
                ],

                technologies,

                recentProjects: projects.slice(0, 5),
            },
            {
                headers: {
                    "Cache-Control": "private, no-store, max-age=0",
                },
            }
        );

    } catch (error) {
        console.error(
            "Dashboard statistics error:",
            error
        );

        return NextResponse.json(
            {
                error: "Impossible de récupérer les statistiques.",
            },
            {
                status: 500,
                headers: {
                    "Cache-Control": "private, no-store, max-age=0",
                },
            }
        );
    }
}
