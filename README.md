# Weather Cloud

Application météo Angular avec authentification Google OAuth, carte interactive et historique des sessions.

## Stack

- **Frontend** : Angular 17, Angular Material, Tailwind CSS
- **Carte** : Leaflet
- **Auth** : Google OAuth 2.0 (angular-oauth2-oidc)
- **Déploiement** : Railway

## Prérequis

- Node.js
- Angular CLI

## Installation

```bash
cd my-app
npm install
```

## Configuration

Copie le fichier d'exemple et remplis tes valeurs :

```bash
cp .env.example .env
```

Variables à renseigner dans `.env` :

```
GOOGLE_CLIENT_ID=your-google-client-id
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

## Déploiement Railway

Dans le dashboard Railway, ajouter les variables d'environnement suivantes :

| Variable | Description |
|---|---|
| `GOOGLE_CLIENT_ID` | Client ID Google OAuth |
| `API_URL` | URL de l'API backend |

Railway exécute `npm run build` automatiquement — le fichier `environment.ts` est généré au moment du build.
