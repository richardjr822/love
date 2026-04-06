// layout.tsx - Root layout with typography, floating ambiance, and persistent navigation shell
import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import Navbar from '@/components/Navbar';
import FloatingOrbs from '@/components/hero/FloatingOrbs';
import PageTransition from '@/components/PageTransition';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'For You',
  description: 'A private, elegant digital love letter and photo experience.',
  robots: 'noindex, nofollow',
  icons: {
    icon: '/polaroid-svgrepo-com.svg',
    shortcut: '/polaroid-svgrepo-com.svg',
    apple: '/polaroid-svgrepo-com.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased">
        <FloatingOrbs />
        <Navbar />
        <PageTransition>
          <main className="relative z-10 pt-[var(--nav-h-mobile)] sm:pt-[var(--nav-h-desktop)]">{children}</main>
        </PageTransition>
      </body>
    </html>
  );
}
