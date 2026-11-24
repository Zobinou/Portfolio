import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@/generated/prisma/client'

import { projects as staticProjects } from '@/data/projects'
import { skillsData } from '@/data/skills'
import { qualities as staticQualities } from '@/data/qualities'
import { educationData } from '@/data/education'
import { experienceData } from '@/data/experience'
import { testimonialsData } from '@/data/testimonials'
import { getIconName } from '@/lib/icon-map'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('🌱 Seed en cours...')

    // Ordre inverse des dépendances (aucune ici, mais bonne pratique)
    await prisma.testimonial.deleteMany()
    await prisma.experience.deleteMany()
    await prisma.education.deleteMany()
    await prisma.quality.deleteMany()
    await prisma.skill.deleteMany()
    await prisma.project.deleteMany()

    // ---------- Projects ----------
    await prisma.project.createMany({
        data: staticProjects.map((p, i) => ({
            slug: p.slug,
            numero: p.numero,
            titre: p.titre,
            description: p.description,
            descriptionLongue: p.descriptionLongue,
            image: p.image,
            lien: p.lien,
            technologies: p.technologies,
            featured: i < 3,
            order: i,
        })),
    })
    console.log(`✅ ${staticProjects.length} projets`)

    // ---------- Skills ----------
    await prisma.skill.createMany({
        data: skillsData.map((s, i) => ({
            name: s.name,
            percent: s.percent,
            icon: getIconName(s.icon),
            order: i,
        })),
    })
    console.log(`✅ ${skillsData.length} compétences`)

    // ---------- Qualities ----------
    await prisma.quality.createMany({
        data: staticQualities.map((label, i) => ({ label, order: i })),
    })
    console.log(`✅ ${staticQualities.length} qualités`)

    // ---------- Education ----------
    await prisma.education.createMany({
        data: educationData.map((e, i) => ({
            titre: e.titre,
            organisation: e.organisation,
            lieu: e.lieu,
            periode: e.periode,
            current: e.current ?? false,
            order: i,
        })),
    })
    console.log(`✅ ${educationData.length} formations`)

    // ---------- Experience ----------
    await prisma.experience.createMany({
        data: experienceData.map((e, i) => ({
            titre: e.titre,
            organisation: e.organisation ?? null,
            description: e.description,
            periode: e.periode,
            current: e.current ?? false,
            order: i,
        })),
    })
    console.log(`✅ ${experienceData.length} expériences`)

    // ---------- Testimonials ----------
    await prisma.testimonial.createMany({
        data: testimonialsData.map((t, i) => ({
            quote: t.quote,
            name: t.name,
            poste: t.poste,
            photo: t.photo ?? null,
            order: i,
        })),
    })
    console.log(`✅ ${testimonialsData.length} témoignages`)

    console.log('🎉 Seed terminé !')
}

main()
    .catch((e) => { console.error('❌', e); process.exit(1) })
    .finally(() => prisma.$disconnect())