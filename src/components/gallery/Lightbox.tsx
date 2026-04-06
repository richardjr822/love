// Lightbox.tsx - Accessible fullscreen photo viewer with keyboard, swipe, and focus-trap support
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { Photo } from '@/lib/content';

interface LightboxProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ photos, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  const photo = photos[currentIndex];
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusedRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (!photo) return;

    previousFocusedRef.current = document.activeElement as HTMLElement;
    const mountTimer = setTimeout(() => setMounted(true), 10);

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';

    const focusableSelectors =
      'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelectors);
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    first?.focus();

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !focusable || focusable.length === 0) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', trapFocus);

    return () => {
      clearTimeout(mountTimer);
      setMounted(false);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', trapFocus);
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      previousFocusedRef.current?.focus();
    };
  }, [handleKeyDown, photo]);

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
    touchStartY.current = event.changedTouches[0]?.clientY ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const touchEndX = event.changedTouches[0]?.clientX ?? null;
    const touchEndY = event.changedTouches[0]?.clientY ?? null;

    if (
      touchStartX.current === null ||
      touchStartY.current === null ||
      touchEndX === null ||
      touchEndY === null
    ) {
      return;
    }

    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;

    if (Math.abs(deltaX) <= Math.abs(deltaY) || Math.abs(deltaX) <= 45) {
      return;
    }

    if (deltaX < -45) onNext();
    if (deltaX > 45) onPrev();
  };

  if (!photo) return null;

  return (
    <div
      className={
        mounted
          ? 'fixed inset-0 z-[300] flex items-center justify-center bg-[rgba(3,1,2,0.96)] p-4 opacity-100 backdrop-blur-[12px] transition-opacity duration-200 md:p-8'
          : 'fixed inset-0 z-[300] flex items-center justify-center bg-[rgba(3,1,2,0.96)] p-4 opacity-0 backdrop-blur-[12px] transition-opacity duration-200 md:p-8'
      }
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div
        ref={dialogRef}
        className={
          mounted
            ? 'relative z-10 flex w-full max-w-[min(860px,92vw)] flex-col overflow-hidden rounded-[24px] border border-white/12 border-t-white/20 bg-[rgba(255,255,255,0.07)] opacity-100 shadow-[0_24px_80px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.10)] backdrop-blur-[32px] [backdrop-filter:saturate(180%)_blur(32px)] transition-all duration-[250ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]'
            : 'relative z-10 flex w-full max-w-[min(860px,92vw)] scale-95 flex-col overflow-hidden rounded-[24px] border border-white/12 border-t-white/20 bg-[rgba(255,255,255,0.07)] opacity-0 shadow-[0_24px_80px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.10)] backdrop-blur-[32px] [backdrop-filter:saturate(180%)_blur(32px)] transition-all duration-[250ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]'
        }
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button
          onClick={onClose}
          className="tap-target absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[rgba(5,2,4,0.85)] transition-all duration-150 hover:bg-[rgba(255,255,255,0.10)] active:scale-90"
          aria-label="Close photo viewer"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="rgba(250,246,240,0.70)" strokeWidth="2">
            <path d="M2 2L14 14M14 2L2 14" />
          </svg>
        </button>

        <div className="relative w-full bg-black/30 h-[clamp(240px,65svh,600px)] md:h-[clamp(240px,72svh,720px)]">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-contain object-center"
            sizes="(max-width: 640px) 100vw, 860px"
            priority
            quality={85}
            placeholder="blur"
            blurDataURL={photo.blurDataURL}
          />
        </div>

        <div className="border-t border-white/7 bg-[rgba(0,0,0,0.20)] px-6 py-3 text-center">
          <p className="font-serif text-[0.9rem] italic text-[rgba(250,246,240,0.78)]">
            {photo.caption}
          </p>
        </div>

        <div className="flex items-center justify-center gap-6 py-4">
          <button
            onClick={onPrev}
            className="tap-target flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/8 text-cream/80 transition-all duration-150 hover:bg-white/15 active:bg-white/15"
            aria-label="Previous photo"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M11 4L6 9L11 14" />
            </svg>
          </button>

          <span className="min-w-[44px] text-center font-sans text-[0.72rem] tracking-[0.08em] text-[rgba(250,246,240,0.38)]">
            {currentIndex + 1} / {photos.length}
          </span>

          <button
            onClick={onNext}
            className="tap-target flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/8 text-cream/80 transition-all duration-150 hover:bg-white/15 active:bg-white/15"
            aria-label="Next photo"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 4L12 9L7 14" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
