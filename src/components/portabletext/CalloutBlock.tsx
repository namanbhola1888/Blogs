import React from 'react';
import { Bookmark, Info, AlertTriangle } from 'lucide-react';

interface CalloutBlockProps {
  value: {
    type?: 'editorial' | 'note' | 'warning';
    title?: string;
    text: string;
  };
}

export const CalloutBlock: React.FC<CalloutBlockProps> = ({ value }) => {
  const type = value.type || 'editorial';

  const styles = {
    editorial: {
      container: 'border-l-2 border-editorial-terracotta bg-editorial-terracotta-light/40 dark:bg-editorial-terracotta/10 text-parchment-900 dark:text-parchment-100',
      icon: <Bookmark className="w-4 h-4 text-editorial-terracotta dark:text-editorial-terracotta-dark shrink-0 mt-0.5" />,
      badge: 'Editorial Reflection',
    },
    note: {
      container: 'border-l-2 border-editorial-olive bg-editorial-olive-light/50 dark:bg-editorial-olive/10 text-parchment-900 dark:text-parchment-100',
      icon: <Info className="w-4 h-4 text-editorial-olive dark:text-editorial-olive-dark shrink-0 mt-0.5" />,
      badge: 'Field Note',
    },
    warning: {
      container: 'border-l-2 border-editorial-ochre bg-editorial-ochre-light/50 dark:bg-editorial-ochre/10 text-parchment-900 dark:text-parchment-100',
      icon: <AlertTriangle className="w-4 h-4 text-editorial-ochre dark:text-editorial-ochre-dark shrink-0 mt-0.5" />,
      badge: 'Critical Context',
    },
  }[type];

  return (
    <aside className={`my-8 p-5 pl-6 rounded-r-md ${styles.container} transition-colors`}>
      <div className="flex items-center gap-2 mb-2">
        {styles.icon}
        <span className="text-xs uppercase tracking-widest font-semibold opacity-75">
          {value.title || styles.badge}
        </span>
      </div>
      <p className="text-base leading-relaxed font-serif italic text-parchment-800 dark:text-parchment-200">
        "{value.text}"
      </p>
    </aside>
  );
};
