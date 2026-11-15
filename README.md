# CHRONICLE — Premium Independent Editorial & Reading Platform

> An independent journal of spatial theory, human-scale computing, and contemplative thought. Built with **React + Vite**, designed for high reading comfort, powered by **Sanity CMS**, and architected for frictionless deployment to **Vercel**.

---

## 1. Architectural Highlights

- **Frontend Engine:** React 18 + Vite 5 + TypeScript + Tailwind CSS.
- **CMS Integration:** Sanity CMS via `@sanity/client`, `@sanity/image-url`, and `@portabletext/react`.
- **Hosting Target:** Vercel (Edge CDN optimized, SPA client routing via `vercel.json`).
- **Modular Adapter Pattern:** The application talks exclusively to a domain `ContentProvider` interface. The default `SanityContentAdapter` fetches published GROQ content and automatically falls back to an embedded high-craft editorial dataset if Sanity environment variables are unconfigured.
- **Future Backend Extensibility:** Ready for future Django/Python, FastAPI, or GraphQL backends with zero component restructuring.

---

## 2. Design System & Reading Experience

Chronicle is built to feel like an independent literary publication (*The Atlantic*, *Aeon*, *Kinfolk*, *Stripe Press*) rather than a generic tech blog template.

### Typographic Rhythm
- **Editorial Headings & Body:** *Newsreader* (variable optical serif) and *Lora*.
- **Interface & Metadata:** *Plus Jakarta Sans*.
- **Monospace & Code Snippets:** *JetBrains Mono*.
- **Reading Measure:** Strictly constrained to `68ch` for optimal saccadic eye movements.
- **Leading & Scale:** Generous 1.85 line-height, editorial drop-caps on opening paragraphs, and an inline font size scaler (`16px` to `24px`).

### Color Science (Light & Dark Themes)
- **Warm Light Mode:** Alabaster parchment (`#FAF7F2`), deep charcoal ink (`#1F1D1A`), terracotta accents (`#9E472A`), and olive secondary tones (`#365347`).
- **Warm Dark Mode:** Deep obsidian and warm charcoal (`#141311`, `#1C1A17`), linen text (`#EDE8E1`), and warm ochre accents (`#D47A57`). **No eye-straining pure `#000000` or stark `#FFFFFF`.**
- **Anti-FOUC:** Theme preference is initialized in `<head>` before React mounts to prevent theme flicker.

---

## 3. Platform Capabilities

| Capability | Implementation |
|---|---|
| **Reading Progress Bar** | Fixed real-time scroll indicator at the top of the viewport. |
| **Dynamic Table of Contents** | Automatically derived from H2/H3 PortableText blocks; uses `IntersectionObserver` to highlight the current heading as you scroll. |
| **Typography Scaler** | Reader-controlled font size adjustment (`A-` / `A+`) stored in session state. |
| **Personal Reading List** | Distraction-free bookmarking system persisted in `localStorage`. |
| **Editorial Search Modal** | Instant search overlay accessible with `⌘K` or `Ctrl+K`. |
| **Rich Prose Renderer** | PortableText serializer with code syntax highlighting, copy button, callout blocks, and responsive captioned imagery. |
| **Adjacent & Related Stories** | Contextual navigation to previous and next dispatches plus topic-related readings. |
| **Colophon & Archival Index** | Full chronological repository index grouped by date, volume, and section. |

---

## 4. Folder Structure

```
├── public/
│   └── favicon.svg              # Editorial monogram icon
├── sanity/
│   ├── sanity.config.ts         # Sanity Studio v3 configuration
│   └── schemas/
│       ├── post.ts              # Reusable publishing template with SEO
│       ├── author.ts            # Author profiles & social links
│       ├── taxonomy.ts          # Categories & tag definitions
│       ├── blockContent.ts      # PortableText blocks (code, callout, image)
│       └── index.ts             # Schema registry
├── src/
│   ├── components/
│   │   ├── article/             # Article detail components (Header, TOC, Share, Bio, Nav)
│   │   ├── layout/              # Navbar, Masthead, Footer, SearchModal, BookmarksDrawer
│   │   ├── portabletext/        # CodeBlock, CalloutBlock, ImageBlock, PortableTextRenderer
│   │   └── stories/             # FeaturedHero, SecondarySpotlight, StoryCard, StoryGrid
│   ├── context/
│   │   ├── ThemeContext.tsx     # Light/Dark mode state & persistence
│   │   ├── BookmarksContext.tsx # Local reading list manager
│   │   └── NavigationContext.tsx# Clean history API client-side routing
│   ├── hooks/                   # useReadingProgress, useTableOfContents
│   ├── pages/                   # HomePage, ArticlePage, CategoryPage, ArchivePage, AboutPage
│   ├── services/
│   │   ├── types.ts             # Domain models (Post, Author, Category, ContentProvider)
│   │   ├── sanityClient.ts      # @sanity/client & image builder
│   │   ├── sanityAdapter.ts     # GROQ queries & transformation
│   │   ├── mockAdapter.ts       # Fallback editorial dataset
│   │   └── index.ts             # Service factory & provider switcher
│   ├── styles/
│   │   └── index.css            # Tailwind directives, drop caps, custom scrollbar
│   ├── App.tsx                  # Root orchestration
│   └── main.tsx                 # Entry point
├── vercel.json                  # Vercel SPA routing rewrite rules & cache headers
├── tailwind.config.js           # Custom typography and editorial palette
└── vite.config.ts               # Vite bundler configuration with `@/` alias
```

---

## 5. Quick Start & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. Chronicle will launch immediately with high-craft sample editorial essays.

### 3. Build for Production
```bash
npm run build
```

---

## 6. Connecting Sanity CMS

Chronicle is pre-configured to fetch from Sanity Studio.

1. Create a free Sanity project at [sanity.io/manage](https://www.sanity.io/manage).
2. Copy your **Project ID** and dataset name (usually `production`).
3. Add them to your `.env` file (or Vercel Environment Variables):

```env
VITE_SANITY_PROJECT_ID=your_actual_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```

4. Once configured, Chronicle automatically queries your Sanity dataset via GROQ and formats your published documents.

### Running Sanity Studio
The schemas in `sanity/schemas/` are standard Sanity Studio v3 schemas. You can deploy Sanity Studio using:
```bash
npx sanity deploy
```
or run Sanity Studio locally:
```bash
npx sanity dev
```

---

## 7. Deploying to Vercel

### Option A: Via GitHub (Recommended)
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Chronicle Editorial Platform"
   git branch -M main
   git remote add origin https://github.com/your-username/chronicle-blog.git
   git push -u origin main
   ```
2. In the [Vercel Dashboard](https://vercel.com/new), select "Import Git Repository".
3. Framework Preset: **Vite**.
4. Root Directory: `./`
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. In **Environment Variables**, add:
   - `VITE_SANITY_PROJECT_ID`
   - `VITE_SANITY_DATASET`
8. Click **Deploy**. Vercel will build and distribute Chronicle across global edge locations.

### Option B: Via Vercel CLI
```bash
npm i -g vercel
vercel
```

The included `vercel.json` guarantees that direct URLs like `/story/the-architecture-of-silence` and `/category/architecture` are properly rewritten to `/index.html`.

---

## 8. Future Python / Django Integration Blueprint

Chronicle's modular architecture separates UI components from data fetching. To connect a Django/Python backend in the future:

1. Create `src/services/djangoAdapter.ts` implementing `ContentProvider`:
   ```typescript
   import { ContentProvider, Post, PostFilterOptions } from './types';

   export class DjangoContentAdapter implements ContentProvider {
     name = 'Django REST API Provider';
     isFallback = false;
     private baseUrl = import.meta.env.VITE_DJANGO_API_URL || 'https://api.chronicle.org';

     async getPosts(options?: PostFilterOptions): Promise<Post[]> {
       const res = await fetch(`${this.baseUrl}/api/posts/?category=${options?.categorySlug || ''}`);
       const data = await res.json();
       return data.results.map(this.mapDjangoPost);
     }

     // ... implement remaining interface methods
   }
   ```
2. In `src/services/index.ts`, switch the active provider:
   ```typescript
   setContentProvider(new DjangoContentAdapter());
   ```
**Zero UI components, pages, or styling rules need to be touched.**

---

## License
MIT License. Crafted for readers and independent publishers.
