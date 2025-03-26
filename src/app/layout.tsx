import { ThemeProvider } from 'next-themes';
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import Header from '@/components/Header';
import './globals.css';

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk'
});

export const metadata: Metadata = {
  title: 'Next Template',
  description: 'A modern Next.js template'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          enableSystem
          attribute='class'
          defaultTheme='light'
          themes={[
            'light',
            'dark'
          ]}
        >
          <NextTopLoader
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            easing='ease'
            speed={200}
            shadow='0 0 10px #2299DD,0 0 5px #2299DD'
            color='var(--primary)'
            showSpinner={false}
          />
          <Header />
          <main className='mx-auto max-w-screen-2xl'>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
