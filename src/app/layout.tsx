import Footer from '@/components/Footer';
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
      <body className="bg-secondary">
        <ContextProvider>
          <Header />
          <div className="mx-auto max-w-5xl">{children}</div>
          <Footer />
        </ContextProvider>
        <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full -z-10 flex items-center justify-center">
          <BackgroundImage />
        </div>
      </body>
    </html>
  );
}
