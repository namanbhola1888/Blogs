import React from 'react';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { CodeBlock } from './CodeBlock';
import { CalloutBlock } from './CalloutBlock';
import { ImageBlock } from './ImageBlock';
import { ExternalLink } from 'lucide-react';

interface PortableTextRendererProps {
  value: any[];
  enableDropCap?: boolean;
}

export const PortableTextRenderer: React.FC<PortableTextRendererProps> = ({
  value,
  enableDropCap = true,
}) => {
  let isFirstParagraph = true;

  const components: PortableTextComponents = {
    types: {
      codeBlock: ({ value }) => <CodeBlock value={value} />,
      callout: ({ value }) => <CalloutBlock value={value} />,
      inlineImage: ({ value }) => <ImageBlock value={value} />,
      image: ({ value }) => <ImageBlock value={value} />,
    },
    block: {
      normal: ({ children }) => {
        if (enableDropCap && isFirstParagraph) {
          isFirstParagraph = false;
          return (
            <p className="prose-dropcap text-lg sm:text-[19px] leading-[1.8] text-parchment-900 dark:text-parchment-100 my-6 font-serif tracking-[0.01em]">
              {children}
            </p>
          );
        }
        return (
          <p className="text-lg sm:text-[19px] leading-[1.85] text-parchment-800 dark:text-parchment-200 my-6 font-serif">
            {children}
          </p>
        );
      },
      h2: ({ children }) => {
        // Derive ID for anchor links and Table of Contents
        const textContent = React.Children.toArray(children)
          .map((c) => (typeof c === 'string' ? c : ''))
          .join('');
        const id = textContent
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        return (
          <h2
            id={id}
            className="group relative text-2xl sm:text-3xl font-serif font-semibold tracking-tight text-parchment-950 dark:text-parchment-50 mt-12 mb-5 pt-4 scroll-mt-24 border-t border-parchment-200 dark:border-obsidian-800/80"
          >
            <a
              href={`#${id}`}
              className="hover:text-editorial-terracotta dark:hover:text-editorial-terracotta-dark transition-colors"
            >
              {children}
            </a>
          </h2>
        );
      },
      h3: ({ children }) => {
        const textContent = React.Children.toArray(children)
          .map((c) => (typeof c === 'string' ? c : ''))
          .join('');
        const id = textContent
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        return (
          <h3
            id={id}
            className="text-xl sm:text-2xl font-serif font-medium tracking-tight text-parchment-900 dark:text-parchment-100 mt-8 mb-4 scroll-mt-24"
          >
            <a
              href={`#${id}`}
              className="hover:text-editorial-terracotta dark:hover:text-editorial-terracotta-dark transition-colors"
            >
              {children}
            </a>
          </h3>
        );
      },
      blockquote: ({ children }) => (
        <blockquote className="my-8 pl-6 border-l-2 border-editorial-terracotta dark:border-editorial-terracotta-dark italic font-serif text-xl sm:text-2xl leading-relaxed text-parchment-900 dark:text-parchment-100">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="my-6 pl-6 list-disc space-y-2.5 font-serif text-lg leading-relaxed text-parchment-800 dark:text-parchment-200 marker:text-editorial-terracotta dark:marker:text-editorial-terracotta-dark">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="my-6 pl-6 list-decimal space-y-2.5 font-serif text-lg leading-relaxed text-parchment-800 dark:text-parchment-200 marker:text-parchment-500 dark:marker:text-obsidian-400 font-medium">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
      number: ({ children }) => <li>{children}</li>,
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-semibold text-parchment-950 dark:text-white">
          {children}
        </strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      code: ({ children }) => (
        <code className="px-1.5 py-0.5 rounded font-mono text-[0.875em] bg-parchment-200 dark:bg-obsidian-800 text-editorial-terracotta dark:text-editorial-terracotta-dark border border-parchment-300 dark:border-obsidian-700">
          {children}
        </code>
      ),
      link: ({ value, children }) => {
        const isExternal = (value?.href || '').startsWith('http');
        return (
          <a
            href={value?.href}
            target={value?.blank ?? isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-0.5 text-editorial-terracotta dark:text-editorial-terracotta-dark underline underline-offset-4 decoration-editorial-terracotta/40 dark:decoration-editorial-terracotta-dark/40 hover:decoration-editorial-terracotta hover:text-editorial-terracotta/80 transition-colors"
          >
            <span>{children}</span>
            {isExternal && <ExternalLink size={12} className="inline opacity-60 ml-0.5" />}
          </a>
        );
      },
    },
  };

  if (!value || !Array.isArray(value)) {
    return null;
  }

  return (
    <div className="editorial-prose max-w-none">
      <PortableText value={value} components={components} />
    </div>
  );
};
