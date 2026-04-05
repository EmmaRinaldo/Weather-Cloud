# Weather Cloud — Frontend

Application météo full-stack avec authentification, carte interactive et historique des sessions.

## Aperçu

L'utilisateur se connecte, la carte détecte sa position, et l'app affiche les données météo correspondantes. Chaque session est enregistrée côté backend et consultable dans l'historique.

## Skills & Technologies

### Framework & Langage
- **Angular 17** — architecture standalone components (sans NgModule), routing, lazy loading
- **TypeScript** — typage strict, interfaces, generics

### UI & Style
- **Angular Material** — composants (cards, forms, dialogs, toolbar)
- **Tailwind CSS** — responsive design utility-first

### Cartographie
- **Leaflet** — carte interactive, géolocalisation navigateur, marqueur personnalisé, events map

### Authentification & Sécurité
- **JWT** — stockage token en localStorage, décodage du payload (base64)
- **HTTP Interceptor** — injection automatique du header `Authorization: Bearer <token>` sur chaque requête
- **Route Guards** — protection des routes privées (`canActivate`)

### Programmation Réactive
- **RxJS** — `BehaviorSubject`, `Observable`, `tap`, gestion d'état asynchrone
- **Angular HttpClient** — consommation d'une REST API, gestion des erreurs

### Architecture
- **Services Angular** — `AuthService`, `SessionService` injectés via `inject()`
- **Component communication** — `@Output` / `EventEmitter` (ex: MapComponent → HomePageComponent)
- **Dependency Injection** — pattern Angular natif avec `inject()`

### DevOps & Déploiement
- **Netlify** — déploiement continu, plugin `@netlify/angular-runtime`
- **Variables d'environnement** — script `generate-env.js` qui génère `environment.ts` au build depuis les env vars
- **`ngx-env/builder`** — exposition des variables d'environnement dans Angular

## Prérequis

- Node.js
- Angular CLI

## Installation

```bash
cd my-app
npm install
```

## Configuration

Créer un fichier `.env` dans `my-app/` :

```
API_URL=https://your-api-url.com
```

## Lancer en local

```bash
cd my-app
npm start
```

## Build

```bash
cd my-app
npm run build
```

Le script `generate-env.js` s'exécute automatiquement avant le build et génère `src/environments/environment.ts` depuis les variables d'environnement.

## Déploiement Netlify

Dans le dashboard Netlify, ajouter :

| Variable | Description |
|---|---|
| `API_URL` | URL de l'API backend |

Netlify exécute `npm run build` automatiquement via `netlify.toml`.
