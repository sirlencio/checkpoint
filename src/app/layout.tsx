import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Providers from './providers/providers';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'CheckPoint',
  description: 'Tu tracker de videojuegos',
};

interface Props {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="es">
      <body className="bg-gray-900 text-white flex flex-col min-h-screen ">
        <Toaster richColors position="top-center" closeButton />
        <Providers>
          <Header />
          <div className="flex flex-1">
            {/*<Sidebar />*/}
            <main className="flex-1 p-6">{children}</main>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
