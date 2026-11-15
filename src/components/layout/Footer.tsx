import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { getProviderInfo } from '../../services';
import { Category } from '../../services/types';
import { Sparkles, Database, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  categories: Category[];
}

export const Footer: React.FC<FooterProps> = ({ categories }) => {
  const { goHome, openCategory, navigate } = useNavigation();
  const providerInfo = getProviderInfo();

  return (
    <footer className="mt-20 border-t-2 border-parchment-300 dark:border-obsidian-800 bg-parchment-200/40 dark:bg-obsidian-950/60 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-parchment-300 dark:border-obsidian-800">
          {/* Publication Masthead Column */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={goHome}
              className="text-left group"
            >
              <h2 className="text-2xl font-serif font-bold tracking-wider text-parchment-950 dark:text-parchment-50">
                CHRONICLE
              </h2>
              <span className="text-xs uppercase tracking-widest text-parchment-500 dark:text-obsidian-400 block mt-0.5">
                An Independent Journal of Ideas & Spatial Theory
              </span>
            </button>
            <p className="font-serif text-sm text-parchment-700 dark:text-obsidian-300 leading-relaxed max-w-sm">
              Published quarterly in print and continuously online. Exploring the intersections of built environments, local-first computing, and the preservation of human contemplation.
            </p>

            {/* Provider Architecture Status Pill */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-parchment-300 dark:border-obsidian-700 bg-parchment-100 dark:bg-obsidian-900 text-xs">
                <Database size={13} className="text-editorial-terracotta dark:text-editorial-terracotta-dark" />
                <span className="font-mono text-[11px] text-parchment-700 dark:text-obsidian-200">
                  {providerInfo.isConfigured ? 'Connected: Sanity Headless CMS' : 'Provider: Modular Editorial Adapter'}
                </span>
                <span className="w-2 h-2 rounded-full bg-editorial-olive dark:bg-editorial-olive-dark animate-pulse" />
              </div>
            </div>
          </div>

          {/* Sections Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-parchment-900 dark:text-parchment-100 font-mono">
              Editorial Sections
            </h4>
            <ul className="space-y-2 text-sm font-serif">
              {categories.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => openCategory(c.slug)}
                    className="text-parchment-600 dark:text-obsidian-300 hover:text-editorial-terracotta dark:hover:text-editorial-terracotta-dark transition-colors"
                  >
                    {c.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Philosophy / Colophon Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-parchment-900 dark:text-parchment-100 font-mono">
              Colophon & Pledges
            </h4>
            <p className="text-xs font-serif leading-relaxed text-parchment-600 dark:text-obsidian-300">
              Designed for long-form comfort: set in Newsreader and Plus Jakarta Sans. No invasive tracking, zero pop-up ad networks, and no programmatic auctions.
            </p>
            <div className="pt-2 space-y-1.5 text-xs text-parchment-600 dark:text-obsidian-300">
              <div>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-editorial-terracotta underline underline-offset-4 decoration-parchment-400"
                >
                  Read Editorial Manifesto & Guidelines
                </button>
              </div>
              <div>
                <button
                  onClick={() => navigate('/archive')}
                  className="hover:text-editorial-terracotta underline underline-offset-4 decoration-parchment-400"
                >
                  Complete Chronological Archive
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-parchment-500 dark:text-obsidian-400 gap-4 font-mono">
          <div>
            © {new Date().getFullYear()} Chronicle Publishing Consortium. All intellectual rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>React + Vite</span>
            <span>·</span>
            <span>Sanity CMS Ready</span>
            <span>·</span>
            <span>Vercel Edge Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
