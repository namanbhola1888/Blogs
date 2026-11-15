import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#9E472A', '#365347', '#D4A359', '#FAF7F2'],
      });
    } catch (err) {}

    setSubscribed(true);
  };

  return (
    <section className="my-16 sm:my-24 rounded-xl border border-parchment-300 dark:border-obsidian-800 bg-parchment-200/50 dark:bg-obsidian-950 p-8 sm:p-12 relative overflow-hidden">
      {/* Decorative Watermark Monogram */}
      <div className="absolute right-4 -bottom-10 text-[180px] font-serif font-black italic text-parchment-300/40 dark:text-obsidian-800/30 select-none pointer-events-none leading-none">
        C
      </div>

      <div className="relative z-10 max-w-xl">
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold text-editorial-terracotta dark:text-editorial-terracotta-dark mb-2">
          <Mail size={13} />
          <span>The Sunday Dispatch</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-parchment-950 dark:text-parchment-50 leading-tight mb-3">
          Quiet reading for Sunday mornings.
        </h3>

        <p className="font-serif text-sm sm:text-base text-parchment-700 dark:text-obsidian-200 leading-relaxed mb-6">
          Delivered once each week at 7:00 AM. A single curated long-form essay, field notes on acoustic architecture, and references from the physical archive. No spam, ever.
        </p>

        {subscribed ? (
          <div className="flex items-center gap-2.5 p-4 rounded-lg bg-editorial-olive-light dark:bg-editorial-olive/20 text-editorial-olive dark:text-editorial-olive-dark border border-editorial-olive/30">
            <CheckCircle2 size={18} />
            <span className="font-serif text-sm">
              You are on the distribution list. Welcome to the reading circle.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your personal email..."
              className="flex-1 px-4 py-2.5 rounded-lg bg-parchment-100 dark:bg-obsidian-900 border border-parchment-300 dark:border-obsidian-700 text-sm text-parchment-950 dark:text-parchment-100 placeholder-parchment-500 dark:placeholder-obsidian-500 focus:outline-none focus:border-editorial-terracotta transition-colors"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-parchment-900 text-parchment-50 dark:bg-parchment-100 dark:text-obsidian-950 hover:bg-editorial-terracotta dark:hover:bg-editorial-terracotta-dark dark:hover:text-white transition-colors flex items-center justify-center gap-2 shrink-0"
            >
              <span>Subscribe</span>
              <ArrowRight size={13} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
