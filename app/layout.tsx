import './globals.css';
import type { Metadata } from 'next';
import { Jost } from 'next/font/google';

const jost = Jost({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bet Better',
  description: 'The frontend UI for the Bet Better server',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`u-min-h-screen u-bg-green-950 ${jost.className}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
