// Navbar.tsx - Production navigation with desktop links and fullscreen mobile menu
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/lib/content';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const focusableSelectors = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusable = menuRef.current?.querySelectorAll<HTMLElement>(focusableSelectors);
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        return;
      }

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

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (pathname === '/story') return null;

  return (
    <>
      <nav className="glass-nav fixed left-0 right-0 top-0 z-50 min-h-[60px] px-5 md:min-h-[68px] md:px-10">
        <div className="mx-auto flex min-h-[60px] w-full max-w-[1400px] items-center justify-between md:min-h-[68px]">
          <Link
            href="/"
            className="font-serif text-[1.2rem] font-light italic tracking-[0.02em] text-[rgba(250,246,240,0.88)] transition-colors duration-200 hover:text-white md:text-[1.35rem]"
          >
            For You
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'tap-target rounded-full px-4 py-2 font-sans text-[0.72rem] uppercase tracking-[0.12em] text-[rgba(250,246,240,0.55)] transition-all duration-200 hover:bg-[rgba(255,255,255,0.07)] hover:text-[rgba(250,246,240,0.90)]',
                    active && 'border border-white/12 bg-[rgba(255,255,255,0.09)] text-[rgba(250,246,240,0.95)]'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={isOpen}
            className="tap-target glass-pill relative ml-auto flex h-10 w-10 items-center justify-center md:hidden"
          >
            <div
              className={cn(
                'absolute h-px w-[18px] bg-[rgba(250,246,240,0.85)] transition-transform duration-300',
                isOpen ? 'rotate-45' : '-translate-y-[4px]'
              )}
            />
            <div
              className={cn(
                'absolute h-px w-[18px] bg-[rgba(250,246,240,0.85)] transition-transform duration-300',
                isOpen ? '-rotate-45' : 'translate-y-[4px]'
              )}
            />
          </button>
        </div>
      </nav>

      <div
        className={cn(
          'fixed inset-0 z-[200] flex flex-col items-center justify-center gap-10 bg-[rgba(5,2,4,0.97)] backdrop-blur-[24px] transition-opacity duration-300 md:hidden',
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setIsOpen(false)}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        <div ref={menuRef} className="flex flex-col items-center justify-center gap-10" onClick={(event) => event.stopPropagation()}>
          {navLinks.map((link, index) => {
            const delayMs = index * 80;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="tap-target min-h-[52px] font-serif text-[clamp(2rem,8vw,3rem)] font-light italic tracking-[0.02em] text-[rgba(250,246,240,0.80)] transition-colors duration-200 hover:text-white active:text-white"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(14px)',
                  transition: `opacity 260ms ease ${delayMs}ms, transform 260ms ease ${delayMs}ms`,
                }}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
