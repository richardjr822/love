// GalleryGrid.tsx - Masonry gallery list with real photos and lightbox orchestration
'use client';

import { useState } from 'react';
import GalleryCard from './GalleryCard';
import Lightbox from './Lightbox';
import type { Photo } from '@/lib/content';

interface GalleryGridProps {
  photos: Photo[];
}

export default function GalleryGrid({ photos }: GalleryGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const getAspectClass = (index: number, isCollage: boolean) => {
    if (isCollage) return 'aspect-square';

    switch (index % 5) {
      case 0:
        return 'aspect-[4/5]';
      case 1:
        return 'aspect-[3/4]';
      case 2:
        return 'aspect-[4/3]';
      case 3:
        return 'aspect-[3/4]';
      default:
        return 'aspect-[4/5]';
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? photos.length - 1 : selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === photos.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  if (photos.length === 0) {
    const placeholderCards = Array.from({ length: 9 }, (_, index) => ({
      id: index,
      aspect: getAspectClass(index, false),
    }));

    return (
      <div>
        <p className="mb-4 mt-3 text-center font-sans text-[0.72rem] uppercase tracking-[0.18em] text-[rgba(250,246,240,0.28)]">
          a collection of us
        </p>

        <div className="columns-1 gap-x-3 sm:columns-2 md:gap-x-4 lg:columns-3" aria-live="polite">
          {placeholderCards.map((card) => (
            <div key={card.id} className="mb-3 break-inside-avoid md:mb-4">
              <div className={`rounded-2xl border border-white/10 bg-white/5 ${card.aspect}`}>
                <div className="skeleton-wave h-full w-full rounded-xl" />
              </div>

              <div className="mt-3 space-y-2 px-1">
                <div className="skeleton-wave h-3 w-2/3 rounded-full" />
                <div className="skeleton-wave h-2 w-1/3 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center font-serif text-sm italic text-[rgba(250,246,240,0.3)]">
          Your photos will live here - add them to /public/photos/
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="columns-1 gap-x-3 sm:columns-2 md:gap-x-4 lg:columns-3" aria-live="polite">
        {photos.map((photo, index) => (
          <GalleryCard
            key={photo.id}
            photo={photo}
            index={index}
            aspectClass={getAspectClass(index, photo.isCollage)}
            priority={index < 3}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>

      {selectedIndex !== null && (
        <Lightbox
          photos={photos}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </>
  );
}
