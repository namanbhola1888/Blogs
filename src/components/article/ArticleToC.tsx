import React from 'react';
import { TableOfContentItem } from '../../services/types';
import { useTableOfContents } from '../../hooks/useTableOfContents';
import { List } from 'lucide-react';

interface ArticleToCProps {
  items?: TableOfContentItem[];
}

export const ArticleToC: React.FC<ArticleToCProps> = ({ items }) => {
  const activeId = useTableOfContents(items);

  if (!items || items.length < 2) return null;

  const scrollToHeading = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <nav
      className="p-5 rounded-lg border border-parchment-300 dark:border-obsidian-800 bg-parchment-200/50 dark:bg-obsidian-900/60 backdrop-blur-sm"
      aria-label="Table of contents"
    >
      <div className="flex items-center gap-2 mb-3.5 pb-2.5 border-b border-parchment-300 dark:border-obsidian-800 text-xs font-semibold uppercase tracking-wider text-parchment-700 dark:text-obsidian-200">
        <List size={14} className="text-editorial-terracotta dark:text-editorial-terracotta-dark" />
        <span>In This Essay</span>
      </div>

      <ul className="space-y-2 text-xs leading-relaxed">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              className={`${
                item.level === 3 ? 'pl-3.5 border-l border-parchment-300 dark:border-obsidian-800' : ''
              }`}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => scrollToHeading(item.id, e)}
                className={`block transition-all duration-200 ${
                  isActive
                    ? 'font-medium text-editorial-terracotta dark:text-editorial-terracotta-dark translate-x-0.5'
                    : 'text-parchment-600 dark:text-obsidian-300 hover:text-parchment-950 dark:hover:text-parchment-100'
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
