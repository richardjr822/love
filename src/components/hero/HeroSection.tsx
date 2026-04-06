// HeroSection.tsx - Landing hero with responsive typography and tactile call-to-action
'use client';

import Link from 'next/link';
import { heroContent } from '@/lib/content';
import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/utils';

export default function HeroSection() {
  const { ref, isRevealed } = useReveal<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-10 text-center sm:px-10">
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        <div className="orb-a absolute left-[8%] top-[18%] h-[240px] w-[240px] rounded-full bg-rose/12 blur-[80px]" />
        <div className="orb-b absolute right-[10%] top-[30%] h-[180px] w-[180px] rounded-full bg-gold/12 blur-[72px]" />
        <div className="orb-c absolute bottom-[16%] left-[38%] h-[150px] w-[150px] rounded-full bg-burgundy/14 blur-[64px]" />
      </div>

      <div ref={ref} className={cn('reveal mx-auto flex w-full max-w-5xl flex-col items-center text-center', isRevealed && 'revealed')}>
        <div className="glass-pill mx-auto mb-7 inline-flex items-center px-5 py-2">
          <span className="font-sans text-[0.68rem] uppercase tracking-[0.20em] text-[rgba(201,169,110,0.80)]">
            {heroContent.eyebrow}
          </span>
        </div>

        <h1 className="mx-auto mb-4 max-w-4xl leading-[1.05]">
          <span className="block text-[clamp(2.8rem,8vw,7rem)] font-light text-cream" style={{ textWrap: 'balance' }}>
            {heroContent.headingLine1}
          </span>
          <em className="text-shimmer block text-[clamp(2.8rem,8vw,7rem)] font-light italic" style={{ textWrap: 'balance' }}>
            {heroContent.headingLine2}
          </em>
        </h1>

        <p className="mx-auto mb-9 max-w-xl font-serif text-[clamp(1.1rem,3.2vw,1.55rem)] italic text-cream/76">
          {heroContent.subtitle}
        </p>

        <Link
          href="/gallery"
          className="tap-target interactive-press glass-pill mx-auto inline-flex min-h-[52px] w-full max-w-[280px] items-center justify-center px-8 py-4 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-cream sm:w-auto"
        >
          {heroContent.cta}
        </Link>

        <div className="absolute bottom-8 hidden justify-center sm:flex">
          <span className="pulse-line h-14 w-px origin-top bg-gradient-to-b from-gold/90 via-gold/65 to-transparent" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/18 to-transparent" />
    </section>
  );
}
