import React, { useState } from 'react';
import { Post } from '../../services/types';
import { useBookmarks } from '../../context/BookmarksContext';
import { Bookmark, Check, Link2, Share2, ZoomIn, ZoomOut } from 'lucide-react';

interface ArticleShareBarProps {
  post: Post;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
}

export const ArticleShareBar: React.FC<ArticleShareBarProps> = ({
  post,
  fontSize,
  onFontSizeChange,
}) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [copied, setCopied] = useState(false);
  const bookmarked = isBookmarked(post.slug);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`"${post.title}" by ${post.author.name} on Chronicle`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      {/* Bookmark Action */}
      <button
        onClick={() => toggleBookmark(post)}
        className={`w-full flex items-center justify-center sm:justify-start gap-2 px-3 py-2.5 rounded text-xs font-medium border transition-colors ${
          bookmarked
            ? 'bg-editorial-terracotta text-white border-editorial-terracotta'
            : 'bg-parchment-200 dark:bg-obsidian-800 border-parchment-300 dark:border-obsidian-700 text-parchment-800 dark:text-parchment-200 hover:bg-parchment-300 dark:hover:bg-obsidian-700'
        }`}
        title={bookmarked ? 'Remove from reading list' : 'Save to reading list'}
      >
        <Bookmark size={14} className={bookmarked ? 'fill-current' : ''} />
        <span>{bookmarked ? 'Saved in Reading List' : 'Save for Later'}</span>
      </button>

      {/* Font Size Tuner */}
      <div className="p-3 rounded border border-parchment-300 dark:border-obsidian-800 bg-parchment-200/40 dark:bg-obsidian-900/40">
        <div className="text-[11px] uppercase tracking-wider font-semibold text-parchment-600 dark:text-obsidian-300 mb-2">
          Reading Size
        </div>
        <div className="flex items-center justify-between gap-1 text-xs">
          <button
            onClick={() => onFontSizeChange(Math.max(16, fontSize - 1))}
            disabled={fontSize <= 16}
            className="p-1.5 rounded hover:bg-parchment-300 dark:hover:bg-obsidian-700 text-parchment-700 dark:text-obsidian-200 disabled:opacity-40"
            title="Decrease font size"
          >
            <ZoomOut size={14} />
          </button>
          <span className="font-mono text-[11px] text-parchment-600 dark:text-obsidian-400">
            {fontSize}px
          </span>
          <button
            onClick={() => onFontSizeChange(Math.min(24, fontSize + 1))}
            disabled={fontSize >= 24}
            className="p-1.5 rounded hover:bg-parchment-300 dark:hover:bg-obsidian-700 text-parchment-700 dark:text-obsidian-200 disabled:opacity-40"
            title="Increase font size"
          >
            <ZoomIn size={14} />
          </button>
        </div>
      </div>

      {/* Share Actions */}
      <div className="pt-2">
        <div className="text-[11px] uppercase tracking-wider font-semibold text-parchment-600 dark:text-obsidian-300 mb-2">
          Share Dispatch
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopyLink}
            className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded text-xs border border-parchment-300 dark:border-obsidian-700 bg-parchment-200 dark:bg-obsidian-800 hover:bg-parchment-300 dark:hover:bg-obsidian-700 text-parchment-800 dark:text-parchment-200 transition-colors"
            title="Copy link to clipboard"
          >
            {copied ? <Check size={13} className="text-editorial-olive" /> : <Link2 size={13} />}
            <span>{copied ? 'Copied' : 'Link'}</span>
          </button>

          <button
            onClick={handleShareTwitter}
            className="p-2 rounded text-xs border border-parchment-300 dark:border-obsidian-700 bg-parchment-200 dark:bg-obsidian-800 hover:bg-parchment-300 dark:hover:bg-obsidian-700 text-parchment-800 dark:text-parchment-200 transition-colors"
            title="Share on X"
          >
            <span className="font-semibold text-xs">𝕏</span>
          </button>

          <button
            onClick={handleShareLinkedIn}
            className="p-2 rounded text-xs border border-parchment-300 dark:border-obsidian-700 bg-parchment-200 dark:bg-obsidian-800 hover:bg-parchment-300 dark:hover:bg-obsidian-700 text-parchment-800 dark:text-parchment-200 transition-colors"
            title="Share on LinkedIn"
          >
            <span className="font-semibold text-xs">in</span>
          </button>
        </div>
      </div>
    </div>
  );
};
