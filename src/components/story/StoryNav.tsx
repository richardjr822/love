// StoryNav.tsx - Progress bar, chapter dots, and prev/next navigation
interface StoryNavProps {
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onJumpTo: (index: number) => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}

export default function StoryNav({
  currentIndex,
  total,
  onPrev,
  onNext,
  onJumpTo,
  canGoPrev,
  canGoNext,
}: StoryNavProps) {
  const progress = ((currentIndex + 1) / total) * 100;
  const showDots = total <= 9;

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed left-0 right-0 top-0 z-[100] h-[2px] bg-white/8">
        <div
          className="h-full transition-[width] duration-[600ms]"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(to right, var(--rose), var(--gold))',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>

      {/* Chapter Dots */}
      {showDots && (
        <div
          className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-[6px] sm:gap-[8px]"
          style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          {Array.from({ length: total }).map((_, index) => (
            <button
              key={index}
              onClick={() => onJumpTo(index)}
              aria-label={`Go to chapter ${index + 1}`}
              className={
                currentIndex === index
                  ? 'h-[5px] w-[20px] rounded-full bg-[linear-gradient(to_right,var(--rose),var(--gold))] transition-all duration-300 ease-out sm:h-[6px] sm:w-[24px]'
                  : 'h-[5px] w-[5px] rounded-full bg-white/25 transition-all duration-300 ease-out hover:bg-white/50 sm:h-[6px] sm:w-[6px]'
              }
            />
          ))}
        </div>
      )}

      {/* Prev Button */}
      <button
        onClick={onPrev}
        disabled={!canGoPrev}
        aria-label="Previous chapter"
        aria-disabled={!canGoPrev}
        className="fixed left-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-white/6 backdrop-blur-[12px] transition-all duration-200 hover:scale-105 hover:border-white/20 hover:bg-white/12 active:scale-95 disabled:pointer-events-none disabled:opacity-0 md:left-8 md:h-12 md:w-12"
        style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(250,246,240,0.7)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={!canGoNext}
        aria-label="Next chapter"
        aria-disabled={!canGoNext}
        className="fixed right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-white/6 backdrop-blur-[12px] transition-all duration-200 hover:scale-105 hover:border-white/20 hover:bg-white/12 active:scale-95 disabled:pointer-events-none disabled:opacity-0 md:right-8 md:h-12 md:w-12"
        style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(250,246,240,0.7)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </>
  );
}
