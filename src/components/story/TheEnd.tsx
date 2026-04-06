// TheEnd.tsx - Final screen after last chapter
'use client';

import { useRouter } from 'next/navigation';

interface TheEndProps {
  onReadAgain: () => void;
  message: string;
}

export default function TheEnd({ onReadAgain, message }: TheEndProps) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex min-h-[100svh] items-center justify-center bg-[#0d0608] px-6 py-[max(1.5rem,env(safe-area-inset-top))]">
      {/* Floating Orbs Background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="orb-a absolute left-[15%] top-[20%] h-[300px] w-[300px] rounded-full bg-rose/20 blur-[80px]" />
        <div className="orb-b absolute right-[20%] top-[40%] h-[250px] w-[250px] rounded-full bg-gold/15 blur-[70px]" />
        <div className="orb-c absolute bottom-[25%] left-[40%] h-[200px] w-[200px] rounded-full bg-burgundy/25 blur-[60px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[42ch] flex-col items-center text-center">
        {/* Chapter Label */}
        <p
          className="mb-6 font-sans text-[0.65rem] uppercase tracking-[0.25em] text-[rgba(201,169,110,0.7)] opacity-0 animate-[fadeUp_600ms_cubic-bezier(0.16,1,0.3,1)_200ms_forwards]"
        >
          Fin
        </p>

        {/* Heading */}
        <h1
          className="mb-8 font-serif text-[clamp(2.2rem,6vw,4.5rem)] font-light italic leading-[1.1] text-[rgba(250,246,240,0.96)] opacity-0 animate-[fadeUp_700ms_cubic-bezier(0.16,1,0.3,1)_400ms_forwards]"
        >
          And the story
          <br />
          continues...
        </h1>

        {/* Divider */}
        <div
          className="mb-8 h-px w-10 bg-[rgba(201,169,110,0.5)] opacity-0 animate-[fadeUp_500ms_cubic-bezier(0.16,1,0.3,1)_600ms_forwards]"
        />

        {/* Message */}
        <p
          className="mx-auto mb-10 max-w-[42ch] font-serif text-[clamp(0.88rem,2vw,1.05rem)] font-light leading-[1.85] text-[rgba(250,246,240,0.68)] opacity-0 animate-[fadeUp_700ms_cubic-bezier(0.16,1,0.3,1)_800ms_forwards]"
        >
          {message}
        </p>

        {/* Buttons */}
        <div className="flex w-full max-w-[260px] flex-col gap-3 opacity-0 animate-[fadeUp_700ms_cubic-bezier(0.16,1,0.3,1)_1000ms_forwards] sm:max-w-none sm:flex-row sm:justify-center">
          <button
            onClick={onReadAgain}
            className="tap-target min-h-[52px] rounded-full border border-white/15 bg-transparent px-8 py-3 font-sans text-sm tracking-wide text-cream/80 backdrop-blur-[12px] transition-all duration-200 hover:bg-white/8 hover:text-cream active:scale-95"
          >
            Read Again
          </button>
          <button
            onClick={() => router.push('/')}
            className="tap-target min-h-[52px] rounded-full border-none px-8 py-3 font-sans text-sm tracking-wide text-cream transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-95"
            style={{
              background: 'linear-gradient(135deg, var(--burgundy), var(--rose))',
            }}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
