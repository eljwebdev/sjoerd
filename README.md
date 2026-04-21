# Astro Starter Kit: Basics

## 🚀 Starter installeren

```sh
git clone git@github.com:Studio-divv/astro-starter.git
```

Voeg een .env file aan de root toe: 

```sh
# Warning: Do not add secrets (API keys and similar) to this file, as it source controlled!
# Use `.env.local` for any secrets, and ensure it is not added to source control

PUBLIC_SANITY_PROJECT_ID="..."
PUBLIC_SANITY_DATASET="production"
```

```sh
Update the sanity integration in your astro.config.mjs file to include the information needed by the Sanity client.

// astro.config.mjs
import { defineConfig } from "astro/config";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
// https://astro.build/config
export default defineConfig({
  integrations: [sanity({
    projectId: '<your-project-id>',
    dataset: '<dataset-name>',
    useCdn: false, // See note on using the CDN
    apiVersion: "2025-01-28", // insert the current date to access the latest version of the API
    studioBasePath: '/studio' // If you want to access the Studio on a route
  }), react()]
});
```

```sh
npm run dev

Ga naar localhost:4321
Of localhost:4321/studio
```

## Add CORS origin to Sanity

[Documentation](https://www.sanity.io/docs/content-lake/cors)

Go to sanity.io/manage. Click on the project and the tab API. Click on + Add CORS origin and add the temporary domain (without /studio).

## 👀 Astro deployment

1. Push your code to your git repository (e.g. GitHub, GitLab).
2. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and navigate to **Compute (Workers) > Workers & Pages**. Select **Create** and then select the **Pages** tab. Connect your git repository.
3. Configure your project with:
    - **Framework preset**: `Astro`
    - **Build command:** `npm run build`
    - **Build output directory:** `dist`
4. Click the **Save and Deploy** button.

## Add environment variables

Go to Workers & Pages, select the project, go to the settings tab.

Under Variables and Secrets, add two environment variables from the .env file (Type=text). Add the variable as the Variable name and the value as the value, don't copy paste the .env file. 

Go to the tab Deployments, click on View details on the Production block. Click Manage deployment → Retry deployment.

## Webhook/deployment button

**1. Get your Cloudflare Pages Deploy Hook:**

- Go to your Cloudflare Pages project
- Settings → Builds & deployments
- Scroll to "Build hooks"
- Click "Add build hook"
- Give it a name like "Sanity Deploy"
- Copy the webhook URL

**2. Add the deploy hook to your environment:**

Create/update .env file:
```sh
PUBLIC_CLOUDFLARE_DEPLOY_HOOK=https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/YOUR_HOOK_ID
```
Also add to Variables and Secrets in Cloudflare settings.

## 🧞 Commands

```sh
npm ci

of

rm -rf node_modules package-lock.json
npm install

node version 23.11.0
```

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

