// FloatingOrbs.tsx - Ambient blurred layers that add cinematic depth without causing overflow
'use client';

export default function FloatingOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="orb-a absolute -left-24 -top-24 h-36 w-36 rounded-full bg-rose/8 blur-[70px] sm:-left-28 sm:-top-28 sm:h-56 sm:w-56 sm:bg-rose/10 lg:h-80 lg:w-80"
      />
      <div
        className="orb-b absolute -right-16 top-[18%] h-32 w-32 rounded-full bg-gold/7 blur-[64px] sm:h-52 sm:w-52 sm:bg-gold/8 lg:h-72 lg:w-72"
      />
      <div
        className="orb-c absolute bottom-[22%] left-[30%] h-28 w-28 rounded-full bg-rose/8 blur-[66px] sm:h-44 sm:w-44 sm:bg-rose/10 lg:h-64 lg:w-64"
      />
      <div
        className="orb-d absolute -bottom-12 right-[18%] h-32 w-32 rounded-full bg-gold/8 blur-[70px] sm:h-52 sm:w-52 sm:bg-gold/9 lg:h-72 lg:w-72"
      />
    </div>
  );
}
