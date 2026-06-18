# Editing site content

All the **text content** of Civildz lives in this folder as simple, well-labelled
files. You can change prices, titles, descriptions, lesson video links, jobs and
articles here **without touching the design or page code**.

## How it works

1. Open the file for the section you want to change (see the table below).
2. Edit the value. Every translatable text is written as:
   ```ts
   tr('English text', 'النص العربي', 'Texte français')
   ```
   Just change the words inside the quotes for the language(s) you want.
3. Save, then apply the changes to the database:
   ```bash
   npm run db:reset
   ```

| File             | What it controls                                              | Common edits                         |
| ---------------- | ------------------------------------------------------------- | ------------------------------------ |
| `services.ts`    | Website-development services                                  | **Prices** (`priceFrom`), features   |
| `lessons.ts`     | Study lessons (body, summary, exercises)                      | **Video links** (`videoUrl`), text   |
| `categories.ts`  | Study subjects                                                | Titles, descriptions                 |
| `exams.ts`       | Exams with solutions                                          | Questions, solutions, duration       |
| `tools.ts`       | Engineering tools list                                        | Names, descriptions                  |
| `software.ts`    | Software guides (AutoCAD, SAP2000…)                           | Article text                         |
| `articles.ts`    | Tutorials & featured articles                                 | Titles, content, `featured`          |
| `jobs.ts`        | Job opportunities                                             | Title, deadline, location            |

Site-wide settings (WhatsApp number, email, business city **Jijel**, and SEO
keywords) are in **`src/config/site.config.ts`**.

## Quick examples

**Change a service price** — in `services.ts`:
```ts
priceFrom: 60000,   // → change to e.g. 75000
```

**Change a lesson’s video** — in `lessons.ts`:
```ts
videoUrl: 'https://www.youtube.com/watch?v=XXXXXXXX',
```

**Hide a price** (show only “Request a quote”) — in `services.ts`:
```ts
priceFrom: null,
```

That’s it — no design changes required.
