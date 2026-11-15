import React from 'react';
import { Author } from '../../services/types';
import { Globe, Github, Twitter, Linkedin } from 'lucide-react';

interface ArticleAuthorBioProps {
  author: Author;
}

export const ArticleAuthorBio: React.FC<ArticleAuthorBioProps> = ({ author }) => {
  return (
    <div className="my-12 p-6 sm:p-8 rounded-lg border border-parchment-300 dark:border-obsidian-800 bg-parchment-200/50 dark:bg-obsidian-900/60">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <img
          src={author.avatar}
          alt={author.name}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-parchment-300 dark:border-obsidian-700 shrink-0"
        />

        <div className="flex-1">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-editorial-terracotta dark:text-editorial-terracotta-dark mb-1">
            About the Author
          </div>
          <h3 className="text-xl font-serif font-semibold text-parchment-950 dark:text-parchment-50 mb-1">
            {author.name}
          </h3>
          <p className="text-xs text-parchment-600 dark:text-obsidian-300 mb-3">
            {author.role}
          </p>
          <p className="text-sm font-serif leading-relaxed text-parchment-800 dark:text-parchment-200 mb-4">
            {author.bio}
          </p>

          {/* Social Links */}
          {author.social && (
            <div className="flex items-center gap-3 text-xs text-parchment-600 dark:text-obsidian-400">
              {author.social.website && (
                <a
                  href={author.social.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-editorial-terracotta transition-colors"
                >
                  <Globe size={13} />
                  <span>Website</span>
                </a>
              )}
              {author.social.twitter && (
                <a
                  href={author.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-editorial-terracotta transition-colors"
                >
                  <Twitter size={13} />
                  <span>Twitter</span>
                </a>
              )}
              {author.social.linkedin && (
                <a
                  href={author.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-editorial-terracotta transition-colors"
                >
                  <Linkedin size={13} />
                  <span>LinkedIn</span>
                </a>
              )}
              {author.social.github && (
                <a
                  href={author.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-editorial-terracotta transition-colors"
                >
                  <Github size={13} />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
