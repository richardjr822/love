// StoryIntro.tsx - Opening screen that appears for 1.5s before story begins
interface StoryIntroProps {
  show: boolean;
}

export default function StoryIntro({ show }: StoryIntroProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex min-h-[100svh] items-center justify-center bg-[#0d0608] px-[max(1.25rem,env(safe-area-inset-left))] py-[max(1.25rem,env(safe-area-inset-top))] transition-opacity duration-500"
      style={{
        opacity: show ? 1 : 0,
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      <div className="flex w-full max-w-[42ch] flex-col items-center justify-center gap-4 text-center">
        <p className="label-ui text-[0.65rem] tracking-[0.25em] text-[rgba(201,169,110,0.7)]">
          Our Story
        </p>
        <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-light italic text-cream/95">
          Every photo tells a chapter.
        </h2>
      </div>
    </div>
  );
}
