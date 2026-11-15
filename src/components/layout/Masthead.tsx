import React from 'react';
import { format } from 'date-fns';
import { useNavigation } from '../../context/NavigationContext';
import { Category } from '../../services/types';

interface MastheadProps {
  categories: Category[];
  selectedCategorySlug?: string;
  onSelectCategory: (slug: string) => void;
}

export const Masthead: React.FC<MastheadProps> = ({
  categories,
  selectedCategorySlug,
  onSelectCategory,
}) => {
  const { goHome } = useNavigation();
  const todayFormatted = format(new Date(), 'EEEE, MMMM d, yyyy');

  return (
    <header className="pt-8 pb-6 border-b border-parchment-300 dark:border-obsidian-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Dateline Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-3 border-b border-parchment-300 dark:border-obsidian-800 text-[11px] uppercase tracking-widest text-parchment-600 dark:text-obsidian-400 gap-2 font-mono">
          <div>{todayFormatted}</div>
          <div className="hidden md:block">Zurich · London · Tokyo · New York</div>
          <div>Vol. XIV — No. 48</div>
        </div>

        {/* Center Grand Logo */}
        <div className="text-center py-8 sm:py-10">
          <button
            onClick={goHome}
            className="group inline-block focus:outline-none"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-[0.08em] text-parchment-950 dark:text-parchment-50 leading-none group-hover:opacity-90 transition-opacity">
              CHRONICLE
            </h1>
          </button>
          <p className="mt-3.5 text-xs sm:text-sm font-serif italic text-parchment-700 dark:text-obsidian-300 max-w-xl mx-auto tracking-wide">
            An independent digital publication dedicated to spatial theory, human-scale computing, and the preservation of contemplative life.
          </p>
        </div>

        {/* Category Navigation Strip */}
        <nav
          className="flex items-center justify-center gap-1 sm:gap-4 overflow-x-auto py-2.5 border-t border-parchment-300 dark:border-obsidian-800 text-xs uppercase tracking-wider font-medium text-parchment-700 dark:text-obsidian-300 no-scrollbar"
          aria-label="Publication sections"
        >
          <button
            onClick={() => onSelectCategory('')}
            className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
              !selectedCategorySlug
                ? 'bg-parchment-900 text-parchment-100 dark:bg-parchment-100 dark:text-obsidian-950 font-semibold'
                : 'hover:text-parchment-950 dark:hover:text-white'
            }`}
          >
            All Dispatches
          </button>
          {categories.map((category) => {
            const isSelected = selectedCategorySlug === category.slug;
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.slug)}
                className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
                  isSelected
                    ? 'bg-parchment-900 text-parchment-100 dark:bg-parchment-100 dark:text-obsidian-950 font-semibold'
                    : 'hover:text-parchment-950 dark:hover:text-white'
                }`}
              >
                {category.title}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
