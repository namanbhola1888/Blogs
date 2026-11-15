import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { ArrowLeft, BookOpen, Layers, Feather, Compass, ShieldCheck } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { goHome } = useNavigation();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <button
        onClick={goHome}
        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-parchment-600 dark:text-obsidian-300 hover:text-editorial-terracotta dark:hover:text-editorial-terracotta-dark transition-colors mb-8"
      >
        <ArrowLeft size={14} />
        <span>Return to Journal</span>
      </button>

      <header className="mb-12 pb-8 border-b border-parchment-300 dark:border-obsidian-800">
        <span className="text-xs uppercase tracking-widest font-semibold text-editorial-terracotta dark:text-editorial-terracotta-dark">
          Colophon & Manifesto
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-parchment-950 dark:text-parchment-50 mt-1 mb-4">
          On the Dignity of Reading
        </h1>
        <p className="font-serif text-lg text-parchment-700 dark:text-obsidian-200 leading-relaxed max-w-2xl">
          Chronicle was founded on a simple conviction: that the interface between a reader and a text is a sacred architectural space.
        </p>
      </header>

      <div className="space-y-12 font-serif text-parchment-800 dark:text-parchment-200 text-lg leading-relaxed">
        {/* Core Manifesto Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-serif font-semibold text-parchment-950 dark:text-parchment-50 flex items-center gap-2">
            <Feather size={20} className="text-editorial-terracotta" />
            <span>The Slow Reading Commitment</span>
          </h2>
          <p>
            The contemporary internet treats human consciousness as an attention deposit to be liquidated. We are inundated by synthetic urgency, algorithmic recommendation engines, and flashings designed to induce hypervigilance.
          </p>
          <p>
            Chronicle rejects this paradigm completely. We publish deliberate, long-form inquiries intended to be read in quiet rooms with a cup of tea. Our typography is tuned to optimal line measures (65–75 characters), proportioned leading, and gentle tonal contrasts that do not fatigue the retina.
          </p>
        </section>

        {/* Pillars Grid */}
        <section className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <div className="p-6 rounded-lg border border-parchment-300 dark:border-obsidian-800 bg-parchment-50/70 dark:bg-obsidian-900/40">
            <div className="w-9 h-9 rounded bg-editorial-terracotta/10 text-editorial-terracotta dark:text-editorial-terracotta-dark flex items-center justify-center mb-3">
              <Compass size={18} />
            </div>
            <h3 className="font-serif font-semibold text-lg text-parchment-950 dark:text-parchment-100 mb-1">
              Zero Algorithmic Feeds
            </h3>
            <p className="text-xs font-serif text-parchment-600 dark:text-obsidian-300 leading-relaxed">
              Every essay is curated by human editors. We do not employ automated outrage filters or metric-maximizing click engines.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-parchment-300 dark:border-obsidian-800 bg-parchment-50/70 dark:bg-obsidian-900/40">
            <div className="w-9 h-9 rounded bg-editorial-olive/10 text-editorial-olive dark:text-editorial-olive-dark flex items-center justify-center mb-3">
              <ShieldCheck size={18} />
            </div>
            <h3 className="font-serif font-semibold text-lg text-parchment-950 dark:text-parchment-100 mb-1">
              Privacy as Architecture
            </h3>
            <p className="text-xs font-serif text-parchment-600 dark:text-obsidian-300 leading-relaxed">
              No third-party trackers, programmatic ad bidding, or data brokers. Your reading bookmarks remain strictly stored on your own device.
            </p>
          </div>
        </section>

        {/* Technical Architecture Section */}
        <section className="space-y-4 pt-6 border-t border-parchment-300 dark:border-obsidian-800">
          <h2 className="text-2xl font-serif font-semibold text-parchment-950 dark:text-parchment-50 flex items-center gap-2">
            <Layers size={20} className="text-editorial-terracotta" />
            <span>Architecture & Future Extensibility</span>
          </h2>
          <p>
            Chronicle is engineered as a high-performance modern web publication built with <strong>React + Vite</strong> and hosted on <strong>Vercel</strong>. Content is managed through <strong>Sanity CMS</strong> using custom Portable Text schemas, automated reading time calculations, and responsive CDN asset pipelines.
          </p>
          <p>
            Crucially, the application implements a <em>Modular Content Provider Pattern</em> (<code className="text-sm font-mono px-1.5 py-0.5 rounded bg-parchment-200 dark:bg-obsidian-800">ContentProvider</code>). The entire frontend communicates exclusively through domain interfaces. In the future, a <strong>Django/Python</strong> REST API or GraphQL backend can be plugged in by creating a single adapter without altering any React components, styles, or page templates.
          </p>
        </section>
      </div>
    </div>
  );
};
