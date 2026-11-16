import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { ArrowLeft, Feather, Compass, ShieldCheck, Heart } from 'lucide-react';

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
          About the Publication
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-parchment-950 dark:text-parchment-50 mt-1 mb-4">
          On the Dignity of Reading
        </h1>
        <p className="font-serif text-lg text-parchment-700 dark:text-obsidian-200 leading-relaxed max-w-2xl">
          Chronicle was founded on a simple conviction: that the interface between a reader and a story is a space that deserves care, patience, and beauty.
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
            Too often, the modern web treats our attention as an asset to be harvested. We are flooded by intrusive ads, autoplaying distractions, and click-driven urgency designed to keep us scrolling rather than thinking.
          </p>
          <p>
            Chronicle is an alternative to that noise. We believe in quiet, long-form pieces written with care, meant to be read without rush. Every detail of this site—from the generous margins and proportional line spacing to the subtle warm color tones—is tuned to give your eyes and mind a calm space to absorb ideas.
          </p>
        </section>

        {/* Pillars Grid */}
        <section className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <div className="p-6 rounded-lg border border-parchment-300 dark:border-obsidian-800 bg-parchment-50/70 dark:bg-obsidian-900/40">
            <div className="w-9 h-9 rounded bg-editorial-terracotta/10 text-editorial-terracotta dark:text-editorial-terracotta-dark flex items-center justify-center mb-3">
              <Compass size={18} />
            </div>
            <h3 className="font-serif font-semibold text-lg text-parchment-950 dark:text-parchment-100 mb-1">
              Curated by Humans
            </h3>
            <p className="text-xs font-serif text-parchment-600 dark:text-obsidian-300 leading-relaxed">
              Every essay is selected and written by thoughtful contributors. We do not use engagement algorithms or sensational headlines.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-parchment-300 dark:border-obsidian-800 bg-parchment-50/70 dark:bg-obsidian-900/40">
            <div className="w-9 h-9 rounded bg-editorial-olive/10 text-editorial-olive dark:text-editorial-olive-dark flex items-center justify-center mb-3">
              <ShieldCheck size={18} />
            </div>
            <h3 className="font-serif font-semibold text-lg text-parchment-950 dark:text-parchment-100 mb-1">
              Zero Clutter, Zero Ads
            </h3>
            <p className="text-xs font-serif text-parchment-600 dark:text-obsidian-300 leading-relaxed">
              No banner ads, pop-up survey modals, or tracking cookies. Your saved bookmarks remain stored securely on your own device.
            </p>
          </div>
        </section>

        {/* Reader-Friendly Editorial Mission */}
        <section className="space-y-4 pt-6 border-t border-parchment-300 dark:border-obsidian-800">
          <h2 className="text-2xl font-serif font-semibold text-parchment-950 dark:text-parchment-50 flex items-center gap-2">
            <Heart size={20} className="text-editorial-terracotta" />
            <span>Our Commitment to You</span>
          </h2>
          <p>
            Whether you are reading in early morning light or winding down late at night, we hope Chronicle serves as an open door to new ideas, thoughtful inquiries, and genuine inspiration.
          </p>
          <p>
            Thank you for spending your valuable time with us.
          </p>
        </section>
      </div>
    </div>
  );
};
