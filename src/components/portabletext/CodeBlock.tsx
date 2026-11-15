import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeBlockProps {
  value: {
    language?: string;
    filename?: string;
    code: string;
  };
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code', err);
    }
  };

  return (
    <div className="my-8 rounded-lg overflow-hidden border border-parchment-300 dark:border-obsidian-700 bg-parchment-200/50 dark:bg-obsidian-950 font-mono text-sm shadow-sm transition-all">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-parchment-300/40 dark:bg-obsidian-800/80 border-b border-parchment-300 dark:border-obsidian-700 text-xs">
        <div className="flex items-center gap-2 text-parchment-700 dark:text-obsidian-200">
          <Terminal size={14} className="opacity-70" />
          <span className="font-medium tracking-wide">
            {value.filename || value.language || 'code'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {value.language && (
            <span className="uppercase text-[10px] tracking-wider px-2 py-0.5 rounded bg-parchment-300 dark:bg-obsidian-700 text-parchment-800 dark:text-obsidian-200">
              {value.language}
            </span>
          )}
          <button
            onClick={handleCopy}
            type="button"
            className="flex items-center gap-1.5 px-2 py-1 rounded text-parchment-700 dark:text-obsidian-200 hover:bg-parchment-300 dark:hover:bg-obsidian-700 transition-colors"
            title="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check size={13} className="text-editorial-olive dark:text-editorial-olive-dark" />
                <span className="text-[11px] text-editorial-olive dark:text-editorial-olive-dark">Copied</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span className="text-[11px]">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Contents */}
      <pre className="p-4 overflow-x-auto text-parchment-900 dark:text-obsidian-100 leading-relaxed font-normal text-xs sm:text-sm">
        <code>{value.code}</code>
      </pre>
    </div>
  );
};
