// PageTransition.tsx - Client wrapper that applies a subtle page fade on route changes
'use client';

import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-fade">
      {children}
    </div>
  );
}
