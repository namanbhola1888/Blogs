import React from 'react';
import { Category } from '../../services/types';
import { Search, X, SlidersHorizontal } from 'lucide-react';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalCount,
}) => {
  return (
    <div className="mb-8 pb-6 border-b border-parchment-300 dark:border-obsidian-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <button
            onClick={() => onSelectCategory('')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all whitespace-nowrap ${
              !selectedCategory
                ? 'bg-parchment-900 text-parchment-50 dark:bg-parchment-100 dark:text-obsidian-950 font-semibold shadow-sm'
                : 'bg-parchment-200/80 dark:bg-obsidian-800 text-parchment-700 dark:text-obsidian-300 hover:bg-parchment-300 dark:hover:bg-obsidian-700'
            }`}
          >
            All Topics ({totalCount})
          </button>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-parchment-900 text-parchment-50 dark:bg-parchment-100 dark:text-obsidian-950 font-semibold shadow-sm'
                    : 'bg-parchment-200/80 dark:bg-obsidian-800 text-parchment-700 dark:text-obsidian-300 hover:bg-parchment-300 dark:hover:bg-obsidian-700'
                }`}
              >
                {cat.title}
              </button>
            );
          })}
        </div>

        {/* In-page Search Bar */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-parchment-500 dark:text-obsidian-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Filter current view..."
            className="w-full pl-8 pr-8 py-1.5 rounded-full bg-parchment-200/60 dark:bg-obsidian-800 border border-parchment-300 dark:border-obsidian-700 text-xs text-parchment-900 dark:text-parchment-100 placeholder-parchment-500 dark:placeholder-obsidian-400 focus:outline-none focus:border-editorial-terracotta dark:focus:border-editorial-terracotta-dark transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-parchment-500 dark:text-obsidian-400 hover:text-parchment-900 dark:hover:text-white"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
