import Header from '@/components/Header';
import BackgroundImage from '@/components/common/BgImage';
import ContextProvider from '@/context';
import type { Metadata } from 'next';
import { inter, sora } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'OP Claim Tool',
  description: 'Powered by WalletConnect',
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="mx-auto max-w-5xl bg-secondary">
        <ContextProvider>
          <Header />
          {children}
        </ContextProvider>
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <BackgroundImage />
        </div>
      </body>
    </html>
  );
}
