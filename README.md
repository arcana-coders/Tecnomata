# Sectry website (Astro + Tailwind)

## Quickstart

- Requirements: Node 18+.
- Install deps: run the VS Code task "astro: dev" (or `npm install` once if prompted).
- Develop: run the VS Code task "astro: dev"; it starts the server and prints the local URL.
- Build: run the task "astro: build" to generate `dist/`.
- Preview: run the task "astro: preview" to serve the production build.

## Safe QA workflow (no risky deploys)

Before merging to `main`, validate changes locally or in CI:

- Smoke tests (headless browser): `npm run test:e2e` — builds the site, serves the production build, and verifies that the home page renders, animations init (no hidden content), and there are no 404/console errors.
- Full QA pipeline: `npm run qa` — builds, runs Playwright smoke tests, then runs Lighthouse CI against `dist/`.

On GitHub, opening a Pull Request to `main` triggers the workflow “QA (Build + E2E + Lighthouse)”, which runs the same checks automatically. Only merge when it’s green.

## VS Code tasks

- astro: dev — start local dev server
- astro: build — production build
- astro: preview — preview production build
- format: prettier — format the repo

## Recommended extensions

- Astro (astro-build.astro-vscode)
- Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)
- Prettier (esbenp.prettier-vscode)

---

# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run test:e2e`        | Run Playwright smoke tests against the built site |
| `npm run qa`              | Build, E2E tests, then Lighthouse CI             |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
