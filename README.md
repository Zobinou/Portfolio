# Niritsiafoy Lantosoa — Portfolio

Portfolio one-page développé avec **React (Vite)** et **Tailwind CSS**. Design sombre avec dégradés violet/indigo, entièrement responsive (mobile → desktop).

## Prérequis

- [Node.js](https://nodejs.org/) (v18 ou plus récent)
- npm (inclus avec Node.js)

## Installation et lancement

```bash
npm install
npm run dev
```

Ouvrez ensuite l'adresse affichée dans le terminal (par défaut : `http://localhost:5173`).

### Build de production

```bash
npm run build
npm run preview
```

Le dossier `dist/` contient alors le site optimisé et prêt à être déployé.

## Déploiement

### Vercel

1. Poussez le projet sur GitHub (ou GitLab/Bitbucket).
2. Sur [vercel.com](https://vercel.com), cliquez **Add New → Project** et importez le dépôt.
3. Vercel détecte automatiquement Vite : *Framework Preset* = **Vite**, *Build Command* = `npm run build`, *Output Directory* = `dist`. Cliquez **Deploy**.

### Netlify

1. Poussez le projet sur GitHub.
2. Sur [netlify.com](https://netlify.com), cliquez **Add new site → Import an existing project**.
3. Réglages :
   - *Build command* : `npm run build`
   - *Publish directory* : `dist`
4. Cliquez **Deploy site**.

## Personnalisation

### Remplacer la photo de profil

Remplacez le fichier `src/assets/images/profile/photo.jpg` par votre propre photo (idéalement carrée, par ex. 800 × 800). Le composant `Hero.jsx` l'importe automatiquement.

### Remplacer le CV (PDF)

Remplacez le fichier `src/assets/documents/CV-Niritsiafoy-Lantosoa.pdf` par votre CV réel en conservant le même nom de fichier (ou mettez à jour l'import dans `Hero.jsx`).

### Ajouter un projet

Ouvrez `src/data/projectsData.js`, copiez un objet existant et modifiez `numero`, `titre`, `description`, `image` (importez d'abord une image), `lien` et `technologies`.

### Ajouter une compétence

Ouvrez `src/data/skillsData.js`, importez l'icône souhaitée depuis `react-icons/fa` et ajoutez `{ name, icon, percent }`.

### Ajouter une expérience

Ouvrez `src/data/experienceData.js` et ajoutez un objet `{ periode, titre, organisation, description, current }`.

### Ajouter une formation

Ouvrez `src/components/Education.jsx` et ajoutez un objet dans le tableau `educationData`.

### Ajouter un témoignage

Ouvrez `src/data/testimonialsData.js`, importez une photo et ajoutez `{ quote, name, poste, photo }`.

### Modifier les coordonnées

Ouvrez `src/components/Contact.jsx` et mettez à jour le tableau `contactLinks` (email, téléphone, LinkedIn, GitHub).

## Couleurs

Définies dans `tailwind.config.js` : `bg-primary #0a0e1a`, `bg-secondary #0d1120`, `bg-card #11162a`, `accent-purple #7C3AED`, `accent-blue #4F46E5`. Le dégradé principal est `from-accent-purple to-accent-blue`.
