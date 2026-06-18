# Civildz

An engineering platform for civil engineers — study materials, engineering
calculators, software guides, job opportunities, and website-development
services. Available in **English** (primary), **Arabic** (RTL) and **French**.

## Tech stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** — luxurious modern geometric design (deep navy + gold)
- **next-intl** — i18n routing & translations (`en` / `ar` / `fr`, RTL-aware)
- **Prisma** + **SQLite** — custom backend & database
- Route Handlers (`/api/*`) for backend logic (e.g. quote requests)

## Project structure

```
prisma/
  schema.prisma        # database models
  seed.ts              # multilingual seed content
src/
  i18n/                # next-intl routing + request config
  messages/            # UI translations: en.json, ar.json, fr.json
  lib/                 # db client, queries, i18n-content helpers, site config
  components/          # Header, Footer, calculators, forms, UI primitives
  app/[locale]/        # localized pages
    page.tsx           # homepage (all sections)
    study/             # subjects → lessons (lesson + summary + video + exercises) + exams
    tools/             # engineering calculators (Concrete Calculator is interactive)
    software/          # educational software guides (AutoCAD, SAP2000, ETABS, MATLAB)
    jobs/              # training, competitions, interview tips
    services/          # website-development services + quote form
    articles/          # tutorials & featured articles
  app/api/quote/       # quote-request backend endpoint
```

## Getting started

```bash
npm install
npm run db:reset      # create the SQLite db and seed content
npm run dev           # http://localhost:3000  →  redirects to /en
```

### Useful scripts

| Script             | Description                                  |
| ------------------ | -------------------------------------------- |
| `npm run dev`      | Start the dev server                         |
| `npm run build`    | Generate Prisma client + production build    |
| `npm run start`    | Run the production build                     |
| `npm run db:push`  | Sync schema to the database                  |
| `npm run db:seed`  | Seed the database                            |
| `npm run db:reset` | Reset + reseed the database                  |

## Platform sections

1. **Home** — latest tutorials, tools, software, exams, web services, featured articles.
2. **Study** — Strength of Materials, Reinforced Concrete, Steel, Topography, Soil
   Mechanics. Each subject has lessons (lesson + summary + video + solved exercises) and exams with solutions.
3. **Engineering tools** — Concrete, Steel, Brick, Unit Converter, Excavation Volume,
   Construction Cost. The **Concrete Calculator** is fully interactive; the rest are scaffolded.
4. **Engineering software** — educational, legal guides only (no downloads).
5. **Jobs** — training, public competitions, interview tips.
6. **Website development** — consulting-firm sites, online stores, SEO/maintenance,
   with a quote-request form.

Contact via WhatsApp: **0540884354**.

## Notes on this iteration

This is the **foundation** build: the full multilingual scaffold, the complete
homepage, and one working example of every section to establish the patterns.
Adding more lessons, articles, jobs, or interactive calculators is a matter of
adding rows to the database / seed and (for new calculators) a client component.
