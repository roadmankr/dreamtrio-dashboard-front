import AppProvider from '@/shared/providers/app-provider';
import Footer from '@/widgets/footer/ui/footer';

import Navigation from '@/widgets/navigation/ui/navigation';
import type { Metadata, Viewport } from 'next';
import { Roboto, Sora } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: '드림트리오 - Dashboard',
  description: '드림트리오 | 완구 , 토이',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body
        className={`${roboto.variable} ${sora.variable} flex min-h-dvh w-full min-w-full justify-center bg-gray-50 antialiased`}
      >
        <div aria-hidden className='pointer-events-none fixed inset-0 -z-10'>
          <div className='absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100' />

          <div className='absolute top-[-10%] left-[-10%] h-[40vh] w-[40vw] rounded-full bg-blue-300/20 blur-[100px]' />
          <div className='absolute right-[-10%] bottom-[-15%] h-[35vh] w-[35vw] rounded-full bg-purple-300/20 blur-[100px]' />
          <div className='absolute bottom-[10%] left-[20%] h-[30vh] w-[30vw] rounded-full bg-emerald-300/20 blur-[120px]' />
        </div>

        <AppProvider>
          <div className='font-sora relative flex min-h-dvh w-full max-w-[1440px] flex-col'>
            <div className='sticky top-0 z-40 border-b bg-white/80 backdrop-blur'>
              {/* <Header> */}
              <Navigation />
              {/* </Header> */}
            </div>

            <main className='flex flex-1'>
              <div className='flex flex-1 space-y-6 overflow-hidden'>
                {children}
              </div>
            </main>

            <Footer />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
