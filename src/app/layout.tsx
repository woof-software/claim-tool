import ContextProvider from '@/context';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OP Claim Tool',
  description: 'Powered by WalletConnect',
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
