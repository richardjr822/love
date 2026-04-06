'use client';

// ChapterSlide.tsx - Single fullscreen chapter with photo and message
import Image from 'next/image';
import { useState } from 'react';
import type { StoryChapter } from '@/lib/content';
import CollageGrid from '@/components/shared/CollageGrid';

interface ChapterSlideProps {
  chapter: StoryChapter;
  isActive: boolean;
  isTransitioning: boolean;
}

export default function ChapterSlide({ chapter, isActive, isTransitioning }: ChapterSlideProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getGradientOverlay = () => {
    switch (chapter.messagePosition) {
      case 'left':
        return 'linear-gradient(to right, rgba(5,2,4,0.88) 0%, rgba(5,2,4,0.4) 45%, transparent 70%)';
      case 'right':
        return 'linear-gradient(to left, rgba(5,2,4,0.88) 0%, rgba(5,2,4,0.4) 45%, transparent 70%)';
      case 'bottom-center':
        return 'linear-gradient(to top, rgba(5,2,4,0.92) 0%, rgba(5,2,4,0.5) 35%, transparent 60%)';
    }
  };

  const getTextPanelClasses = () => {
    const base = 'absolute z-10 hidden flex-col px-8 py-8 md:flex md:px-12 md:py-12';

    if (chapter.isCollage && chapter.messagePosition !== 'bottom-center') {
      if (chapter.messagePosition === 'left') {
        return `${base} right-0 top-0 bottom-0 w-1/2 justify-center`;
      }
      return `${base} left-0 top-0 bottom-0 w-1/2 justify-center`;
    }

    switch (chapter.messagePosition) {
      case 'left':
        return `${base} left-0 top-0 bottom-0 w-[min(520px,48vw)] justify-center`;
      case 'right':
        return `${base} right-0 top-0 bottom-0 w-[min(520px,48vw)] justify-center`;
      case 'bottom-center':
        return `${base} bottom-0 left-0 right-0 mx-auto max-w-[760px] text-center`;
    }
  };

  const isCentered = chapter.messagePosition === 'bottom-center';

  return (
    <div className="fixed inset-0">
      {/* Photo */}
      <div
        className="absolute inset-0 transition-all duration-[400ms]"
        style={{
          opacity: isTransitioning ? 0.3 : 1,
          transform: isActive && !isTransitioning ? 'scale(1)' : 'scale(1.03)',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {chapter.isCollage ? (
          <>
            <div className="absolute inset-0 overflow-hidden sm:hidden">
              <CollageGrid src={chapter.photo} alt={chapter.alt} />
            </div>

            {chapter.messagePosition === 'bottom-center' ? (
              <div className="absolute inset-x-0 top-0 hidden h-[65vh] overflow-hidden sm:block">
                <CollageGrid src={chapter.photo} alt={chapter.alt} />
              </div>
            ) : (
              <div
                className={`absolute top-0 bottom-0 hidden w-1/2 overflow-hidden sm:block ${
                  chapter.messagePosition === 'left' ? 'left-0' : 'right-0'
                }`}
              >
                <CollageGrid src={chapter.photo} alt={chapter.alt} />
              </div>
            )}
          </>
        ) : (
          <Image
            src={chapter.photo}
            alt={chapter.alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
      </div>

      {/* Gradient Overlays */}
      <div
        className="absolute inset-0 sm:hidden"
        style={{
          background: 'linear-gradient(to top, rgba(5,2,4,0.95) 0%, rgba(5,2,4,0.5) 40%, transparent 70%)',
          opacity: isTransitioning ? 0 : 1,
        }}
      />
      <div
        className="absolute inset-0 hidden transition-opacity duration-300 sm:block"
        style={{
          background: getGradientOverlay(),
          opacity: isTransitioning ? 0 : 1,
        }}
      />
      <div
        className="absolute inset-x-0 top-0 hidden h-[30vh] transition-opacity duration-300 sm:block"
        style={{
          background: 'linear-gradient(to bottom, rgba(5,2,4,0.5) 0%, transparent 100%)',
          opacity: isTransitioning ? 0 : 1,
        }}
      />

      {/* Mobile Text Panel */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-[4.5rem] pt-6 sm:hidden">
        <div
          className="transition-all duration-200"
          style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? 'translateY(-12px)' : 'translateY(0)',
            transitionTimingFunction: 'ease-in',
          }}
        >
          <p className="mb-[1rem] font-sans text-[0.62rem] uppercase tracking-[0.22em] text-[rgba(201,169,110,0.65)]">
            {chapter.chapter}
          </p>

          <h2
            className="mb-[0.8rem] font-serif text-[clamp(1.5rem,5.5vw,2rem)] font-light italic leading-[1.15] text-[rgba(250,246,240,0.96)]"
            style={{ textWrap: 'balance' }}
          >
            {chapter.title}
          </h2>

          <div
            className="mb-[0.8rem] h-px w-8"
            style={{
              background: 'linear-gradient(to right, rgba(201,169,110,0.6), rgba(201,169,110,0.1))',
            }}
          />

          <p
            className="font-serif text-[0.86rem] font-light leading-[1.75] text-[rgba(250,246,240,0.68)]"
            style={
              isExpanded
                ? { textWrap: 'pretty' }
                : {
                    display: '-webkit-box',
                    WebkitLineClamp: 5,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textWrap: 'pretty',
                  }
            }
          >
            {chapter.message}
          </p>

          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="mt-2 font-sans text-[0.65rem] tracking-[0.16em] text-gold/40"
            aria-label={isExpanded ? 'Collapse chapter message' : 'Expand chapter message'}
          >
            {isExpanded ? '↑ less' : '↓ more'}
          </button>
        </div>
      </div>

      {/* Desktop Text Panel */}
      <div className={getTextPanelClasses()}>
        <div
          className="transition-all duration-200"
          style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? 'translateY(-12px)' : 'translateY(0)',
            transitionTimingFunction: 'ease-in',
          }}
        >
          {/* Chapter Label */}
          <p
            className="mb-[1.2rem] font-sans text-[0.65rem] uppercase tracking-[0.25em] text-[rgba(201,169,110,0.65)]"
            style={{ transitionDelay: '0ms' }}
          >
            {chapter.chapter}
          </p>

          {/* Title */}
          <h2
            className="mb-[1.2rem] font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] font-light italic leading-[1.15] text-[rgba(250,246,240,0.96)] max-sm:text-[clamp(1.8rem,5vw,2.2rem)]"
            style={{ 
              textWrap: 'balance',
              transitionDelay: '80ms',
            }}
          >
            {chapter.title}
          </h2>

          {/* Divider */}
          <div
            className={isCentered ? 'mx-auto mb-[1.4rem] h-px w-10' : 'mb-[1.4rem] h-px w-10'}
            style={{
              background: 'linear-gradient(to right, rgba(201,169,110,0.6), rgba(201,169,110,0.1))',
              transitionDelay: '160ms',
            }}
          />

          {/* Message */}
          <p
            className={`font-serif text-[clamp(0.9rem,1.5vw,1.02rem)] font-light leading-[1.90] text-[rgba(250,246,240,0.68)] max-sm:line-clamp-4 ${isCentered ? 'mx-auto' : ''}`}
            style={{
              maxWidth: '36ch',
              textWrap: 'pretty',
              transitionDelay: '240ms',
            }}
          >
            {chapter.message}
          </p>
        </div>
      </div>
    </div>
  );
}
