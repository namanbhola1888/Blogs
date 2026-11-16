import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { Category } from '../../services/types';

interface FooterProps {
  categories: Category[];
}

export const Footer: React.FC<FooterProps> = ({ categories }) => {
  const { goHome, openCategory, navigate } = useNavigation();

  return (
    <footer className="mt-20 border-t-2 border-parchment-300 dark:border-obsidian-800 bg-parchment-200/40 dark:bg-obsidian-950/60 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-parchment-300 dark:border-obsidian-800">
          {/* Publication Masthead Column */}
          <div className="md:col-span-5 space-y-3">
            <button
              onClick={goHome}
              className="text-left group"
            >
              <h2 className="text-2xl font-serif font-bold tracking-wider text-parchment-950 dark:text-parchment-50">
                CHRONICLE
              </h2>
              <span className="text-xs uppercase tracking-widest text-parchment-500 dark:text-obsidian-400 block mt-0.5">
                A Journal of Ideas, Essays & Culture
              </span>
            </button>
            <p className="font-serif text-sm text-parchment-700 dark:text-obsidian-300 leading-relaxed max-w-sm">
              A quiet reading space created for curious minds — dedicated to thoughtful essays, distinct perspectives, and deliberate reading.
            </p>
          </div>

          {/* Sections Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-parchment-900 dark:text-parchment-100 font-mono">
              Sections
            </h4>
            {categories.length > 0 ? (
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
            ) : (
              <p className="text-xs font-serif text-parchment-500 dark:text-obsidian-400 italic">
                Sections will appear here as categories are published.
              </p>
            )}
          </div>

          {/* Colophon & Navigation Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-parchment-900 dark:text-parchment-100 font-mono">
              Explore
            </h4>
            <div className="space-y-2 text-sm font-serif">
              <div>
                <button
                  onClick={() => navigate('/about')}
                  className="text-parchment-600 dark:text-obsidian-300 hover:text-editorial-terracotta dark:hover:text-editorial-terracotta-dark transition-colors"
                >
                  About the Publication & Philosophy
                </button>
              </div>
              <div>
                <button
                  onClick={() => navigate('/archive')}
                  className="text-parchment-600 dark:text-obsidian-300 hover:text-editorial-terracotta dark:hover:text-editorial-terracotta-dark transition-colors"
                >
                  Chronological Article Archive
                </button>
              </div>
            </div>
            <p className="text-xs font-serif leading-relaxed text-parchment-500 dark:text-obsidian-400 pt-2">
              Set in quiet typography for unhurried reading — honoring curious minds and the lost art of paying attention.
            </p>
          </div>
        </div>

        {/* Bottom Copyright & Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-parchment-500 dark:text-obsidian-400 gap-4 font-mono">
          <div>
            © {new Date().getFullYear()} Chronicle. All rights reserved.
          </div>
          <div>
            Crafted for readers & writers.
          </div>
        </div>
      </div>
    </footer>
  );
};
