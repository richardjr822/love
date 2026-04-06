// gallery/page.tsx - Gallery route with reveal heading and mobile-first masonry flow
'use client';

import { useEffect } from 'react';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import { photos } from '@/lib/content';
import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/utils';

export default function GalleryPage() {
  const { ref, isRevealed } = useReveal<HTMLDivElement>({ threshold: 0.08 });

  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  return (
    <div className="mx-auto min-h-screen max-w-[1400px] px-4 pb-16 pt-24 sm:px-6 md:px-10 md:pb-24 md:pt-28 lg:px-16">
      <div ref={ref} className={cn('reveal mb-10 text-center md:mb-14', isRevealed && 'revealed')}>
        <h1 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-light text-cream">
          Our <em className="italic text-rose">Moments</em>
        </h1>
        <div className="mx-auto my-4 h-px w-12 bg-[linear-gradient(to_right,transparent,rgba(201,169,110,0.6),transparent)]" />
        <p className="mt-[0.6rem] font-sans text-[0.72rem] uppercase tracking-[0.18em] text-[rgba(250,246,240,0.28)]">
          a collection of us
        </p>
      </div>

      <GalleryGrid photos={photos} />
    </div>
  );
}
