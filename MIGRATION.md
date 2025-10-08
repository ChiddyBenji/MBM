# Guide de Migration vers Next.js

## Vue d'ensemble

Ce document décrit la migration du projet MBM de Create React App vers Next.js.

## Changements principaux

### 1. Structure du projet

**Avant (Create React App) :**
```
src/
  ├── pages/
  │   └── App.jsx
  ├── components/
  ├── assets/
  └── styles/
```

**Après (Next.js) :**
```
pages/                    # Nouveau : routing Next.js
  ├── _app.js            # Configuration globale
  ├── _document.js       # HTML personnalisé
  └── index.js           # Page d'accueil
src/
  ├── components/        # Inchangé
  └── styles/            # Inchangé
public/                  # Nouveau : assets statiques
  ├── images/
  └── fonts/
```

### 2. Configuration

#### Fichiers ajoutés :
- `next.config.js` - Configuration Next.js
- `pages/_app.js` - Configuration globale de l'application
- `pages/_document.js` - Document HTML personnalisé
- `.gitignore` - Mis à jour pour Next.js

#### Fichiers supprimés :
- `src/index.js` - Remplacé par le système de pages Next.js
- `public/index.html` - Remplacé par `_document.js`

### 3. Modifications des composants

#### Routing
**Avant (React Router) :**
```jsx
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
navigate("/");
```

**Après (Next.js) :**
```jsx
import { useRouter } from "next/router";
const router = useRouter();
router.push("/");
```

#### Images
**Avant :**
```jsx
import logo from "../assets/logo.png";
<img src={logo} alt="Logo" />
```

**Après :**
```jsx
<img src="/logo.png" alt="Logo" />
```

Les images sont maintenant servies depuis le dossier `public/`.

#### Fonts
**Avant (SCSS) :**
```scss
@font-face {
  src: url("../assets/fonts/ppneuemontreal-medium.otf");
}
```

**Après (SCSS) :**
```scss
@font-face {
  src: url("/fonts/ppneuemontreal-medium.otf");
}
```

### 4. Scripts package.json

**Avant :**
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
}
```

**Après :**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next build && next export"
  }
}
```

### 5. Dépendances

#### Ajoutées :
- `next` - Framework Next.js

#### Supprimées :
- `react-scripts` - Plus nécessaire
- `react-router-dom` - Remplacé par le routing Next.js
- `gh-pages` - Optionnel pour le déploiement

#### Conservées :
- `react` & `react-dom`
- `framer-motion`
- `react-spring`
- `sass`

### 6. Fonctionnalités préservées

✅ **Toutes les fonctionnalités ont été préservées :**
- Curseur personnalisé
- Animations (Framer Motion & React Spring)
- Menu mobile avec burger
- Slideshow interactif
- Formulaire de contact
- Scroll Steps Container
- Toutes les sections (Who, How, What, Template, Plans, Form)
- Design responsive complet
- Styles SCSS

### 7. Améliorations

- ⚡ Performances améliorées avec Next.js
- 🚀 Possibilité de SSG (Static Site Generation)
- 📦 Taille de bundle optimisée
- 🔧 Meilleure expérience développeur
- 🌐 Export statique simplifié (`npm run export`)

## Migration des assets

Tous les assets ont été migrés :
```bash
src/assets/ → public/
```

Cela inclut :
- ✅ Toutes les images (`.png`, `.jpg`)
- ✅ Toutes les fonts (`.otf`)
- ✅ Structure des dossiers préservée

## Commandes disponibles

### Développement
```bash
npm run dev
```
Lance le serveur de développement sur http://localhost:3000

### Production
```bash
npm run build
npm run start
```
Crée et lance une version de production

### Export statique
```bash
npm run export
```
Exporte le site dans le dossier `out/` pour un déploiement statique

## Compatibilité

- ✅ Node.js 18+
- ✅ Tous les navigateurs modernes
- ✅ Mobile & Desktop
- ✅ Export statique possible

## Déploiement

Le site peut être déployé sur :
- Vercel (recommandé)
- Netlify
- GitHub Pages (via export statique)
- Tout hébergeur supportant Node.js ou sites statiques

## Points d'attention

1. **Imports d'images** : Utilisez maintenant `/image.png` au lieu de `import image from './image.png'`
2. **Routing** : Utilisez `useRouter()` de Next.js au lieu de `useNavigate()` de React Router
3. **Public folder** : Tous les assets statiques doivent être dans `public/`
4. **API Routes** : Possibilité d'ajouter des routes API dans `pages/api/` si besoin

## Tests post-migration

✅ Vérifier que toutes les images s'affichent correctement
✅ Tester le menu mobile
✅ Vérifier toutes les animations
✅ Tester le formulaire de contact
✅ Vérifier le responsive
✅ Tester le scroll et les interactions

## Support

Pour toute question concernant cette migration, référez-vous à :
- [Documentation Next.js](https://nextjs.org/docs)
- [Guide de migration Next.js](https://nextjs.org/docs/migrating)

