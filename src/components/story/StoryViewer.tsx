// StoryViewer.tsx - Main orchestrator for the cinematic story experience
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { StoryChapter } from '@/lib/content';
import ChapterSlide from './ChapterSlide';
import StoryNav from './StoryNav';
import TheEnd from './TheEnd';
import StoryIntro from './StoryIntro';

interface StoryViewerProps {
  chapters: StoryChapter[];
  endMessage: string;
}

export default function StoryViewer({ chapters, endMessage }: StoryViewerProps) {
  const router = useRouter();
  const [showIntro, setShowIntro] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Handle intro dismissal
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;

    if (currentIndex === chapters.length - 1) {
      setShowEnd(true);
      return;
    }

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 200);
  }, [chapters.length, currentIndex, isTransitioning]);

  const handlePrev = useCallback(() => {
    if (isTransitioning || currentIndex === 0) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => prev - 1);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 200);
  }, [currentIndex, isTransitioning]);

  const handleJumpTo = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 200);
  }, [currentIndex, isTransitioning]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showIntro || showEnd) return;

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handlePrev();
          break;
        case 'Escape':
          router.push('/');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, router, showEnd, showIntro]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Handle touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;

    if (Math.abs(deltaX) <= Math.abs(deltaY)) return;

    if (deltaX > 50) {
      handlePrev();
    } else if (deltaX < -50) {
      handleNext();
    }
  };

  const handleReadAgain = () => {
    setShowEnd(false);
    setCurrentIndex(0);
  };

  if (showEnd) {
    return <TheEnd onReadAgain={handleReadAgain} message={endMessage} />;
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <StoryIntro show={showIntro} />

      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        className="fixed left-4 top-[env(safe-area-inset-top,16px)] z-50 flex items-center gap-2 rounded-full border border-white/10 bg-[rgba(5,2,4,0.5)] px-3 py-2 backdrop-blur-[12px] transition-all duration-200 hover:border-white/20 hover:text-cream md:left-8 md:px-4"
        aria-label="Back to home"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[rgba(250,246,240,0.6)]"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <span className="font-sans text-[0.7rem] tracking-wide text-[rgba(250,246,240,0.6)] md:text-[0.75rem]">
          For You
        </span>
      </button>

      {/* Current Chapter */}
      <ChapterSlide
        key={currentIndex}
        chapter={chapters[currentIndex]}
        isActive={!isTransitioning}
        isTransitioning={isTransitioning}
      />

      {/* Preload Adjacent Images */}
      {chapters.map((chapter, index) => {
        const distance = Math.abs(index - currentIndex);
        if (distance > 1) return null;

        return (
          <div key={chapter.id} className="absolute inset-0 pointer-events-none opacity-0" aria-hidden="true">
            <Image
              src={chapter.photo}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        );
      })}

      {/* Navigation */}
      <StoryNav
        currentIndex={currentIndex}
        total={chapters.length}
        onPrev={handlePrev}
        onNext={handleNext}
        onJumpTo={handleJumpTo}
        canGoPrev={currentIndex > 0}
        canGoNext={currentIndex < chapters.length - 1}
      />
    </div>
  );
}
