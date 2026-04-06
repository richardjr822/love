// GalleryCard.tsx - Photo card with reveal animation, loading skeleton, and tactile interaction states
'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Photo } from '@/lib/content';
import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/utils';

interface GalleryCardProps {
  photo: Photo;
  index: number;
  aspectClass: string;
  priority?: boolean;
  onClick: () => void;
}

export default function GalleryCard({ photo, index, aspectClass, priority = false, onClick }: GalleryCardProps) {
  const [loaded, setLoaded] = useState(false);
  const { ref, isRevealed } = useReveal<HTMLDivElement>({ threshold: 0.15 });

  const revealDelay = ['[transition-delay:0ms]', '[transition-delay:80ms]', '[transition-delay:160ms]'][
    index % 3
  ];

  return (
    <div
      ref={ref}
      className={cn(
        'break-inside-avoid mb-4 reveal md:mb-5',
        revealDelay,
        isRevealed && 'revealed'
      )}
    >
      <button
        type="button"
        onClick={onClick}
        className="tap-target group relative w-full cursor-pointer overflow-hidden rounded-[20px] border border-white/8 bg-white/4 text-left transition-[transform,border-color,box-shadow] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1.5 hover:scale-[1.01] hover:border-[rgba(201,169,110,0.30)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(201,169,110,0.10)] active:-translate-y-[2px] active:scale-[1.005] active:duration-75"
        aria-label={`Open photo: ${photo.caption}`}
      >
        <div className={cn('relative w-full overflow-hidden', aspectClass)}>
          <div
            className={cn(
              'skeleton-shimmer absolute inset-0 bg-gradient-to-br from-white/8 via-white/4 to-white/8 transition-opacity duration-500',
              loaded && 'opacity-0'
            )}
            aria-hidden="true"
          />

          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className={cn(
              'object-cover transition-transform duration-[600ms] [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]',
              photo.aspect === 'portrait' ? 'object-top' : 'object-center',
              !loaded && 'opacity-0'
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={85}
            priority={priority}
            placeholder="blur"
            blurDataURL={photo.blurDataURL}
            onLoad={() => setLoaded(true)}
          />

          <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(5,2,4,0.85)_0%,rgba(5,2,4,0.4)_60%,transparent_100%)] px-3 pb-3 pt-6 sm:px-4 sm:pb-4 sm:pt-8">
            <p className="font-serif text-[0.82rem] italic leading-[1.3] text-[rgba(250,246,240,0.90)] transition-transform duration-300 ease-out group-hover:-translate-y-[3px] sm:text-[0.85rem]">
              {photo.caption}
            </p>
          </div>

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.20)',
            }}
            aria-hidden="true"
          />
        </div>
      </button>
    </div>
  );
}
