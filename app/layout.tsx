import QueryProvider from '@/shared/providers/query-provider';
import ToastProvider from '@/shared/providers/toast-provider';
import Header from '@/widgets/header/ui/Header';
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
  description: '드림트리오 | 완구',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <link
        href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABNpJREFUWEftlntQVHUUx7/n7gMaFkVFR9AeOmqG4SjIe1lHZlSGt691SsEUnHESA43RypQxw5zJUjTQMhRmzMoEc5ESdcR4KCCIgzD+oQEqprVCsoTs+9fcXRZ3adltosmZht8/997f7/y+53PPPef8LuEZD3rG/jEM8P+JQFwliwOQC8ALwEl1D9acW0g9znLsX4lAdAUbJSDcA+BmcUjArtNS2vqfAMRWsmACrtg4YyhVhFPkkAHYKtnbAFYBuAsI06jg4s8DRRPKmIdRhHbrCADYqZDS9iEBsCRpDIgr7hch1FB+ebA90dgKFkOEQwDGAyhkrlhdPIeeDBFg7nsglmUloqGCcldHos3NJ8QzZsi1zhxb5crgpiwxfC44umRlcZ4KyhfY21FRne//nXF+7X3jOC5BVFaXGLQg4O9AOK0CliRbDuJzgLWBQyYdrVCy6xsDYTAYyH9/vcXJjivNvfUGH1N0BDBirbgwMypQ/oEzCOcAR99wRadqHVzoCqUW1rCG9HfB2K4+4Qzyy/7kWM3Z6hO6hUFm5wYYIIAXPWIrxeemhAesaHEE4Rzg/eg7uNf9AoQc4Osph8w7A6DAPtGq87qg/MO6JYc1EMOHa9GHiBoLjmjikxkIMsG1rowQf49/DMB2L8rDzY41/QIeLhosf/kAXAUZ/Jwaoo/eUadvaTVO4CT0BClCRUxE0GslOdVVv5TqQ/mOiCTRmeKlQbF8l7Q7Bo0Ay5bPw43fLkJnBEaIdVBpRSaFSSNuIG7yRnAw5qrlx0v1YXzZ2Ti6fPnL0d8iUjkQzB6BXQDGf/emB0o86pVAzDG86inF7+pDaFX5mkRmem5XyBJfzNMkJPOP9kJ9ruZ4ivWniUP9iNBQee9ACPsAO+PKcftxuMnYd0wOZZxKZXsTPNDa8xBdGhdIRIZ1r3/NPWBjyVGyWSdnnPDS7ZTgeVOdArBPl6xDo/IgGICJ7m2UVTLJsontW7oMjcoTkE3EWZ94fKFdjLXiIoflZilPvjSTxUU7YwKX2bRnmwiwg8smoKmzDX/ohJCI9PAZO5nWf8Ofcv2DHU8swfTRUfxElWHWVWnAaktF2E0yvkEdMSTUdbCRGE8dLFFcalOatgBbo1vR3v2S6Udt5rj1tOkkf74/dV6f/gqI8c3nub7JXjDyJ/99Nx2VmqL2VE6eNv5NvjSlggbV5hC/kRb7fgC2J2E/bnRuMC1M8aiibQqpjfNbG1zQzVUDmAWgs29tNIDrcDcG09QDGkcQudWV98/qw7x5m5WiMz/Ig2Kj+XsTAMteGoqmjkpoDYQxrj3w9fak1flqG4BraXsA8EczwNhi05WoyPyMj8k/e7MjgLq6z0ce00Z1thgncm7Uy7fq+IiARIUZYEvkIzx8MsYkMH1UMdyEmfRWYYNFkDWkh4Gxyj5nDeDI3OMZy+yLCANROM3eV2UNcaH2qxWPje5mWAAqSHy+18+bzt/7Cm7pskKmic0Aq2R8zj8d7mI9fXbB3Hj49WtpfObucPSGALaRX/aHFpufao88n6NdcVcNsd1tBIbTUo7MADtir6Kla06/pZebknb/OK4f4PqmaTAaLgKYMAhEO4hF0Oz9tyzrZc05kqKuRao7Rq+/9Bre+Xxh9a+pwaHjnR5GTt56yMvDAMMR+BMZudUwX5+a+gAAAABJRU5ErkJggg=='
        rel='shortcut icon'
      />

      <body
        className={`${roboto.variable} ${sora.variable} flex min-h-dvh w-full min-w-full justify-center bg-gray-50 antialiased`}
      >
        <div aria-hidden className='pointer-events-none fixed inset-0 -z-10'>
          {/* gradient base */}
          <div className='absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100' />

          {/* pastel aurora spots */}
          <div className='absolute top-[-10%] left-[-10%] h-[40vh] w-[40vw] rounded-full bg-blue-300/20 blur-[100px]' />
          <div className='absolute right-[-10%] bottom-[-15%] h-[35vh] w-[35vw] rounded-full bg-purple-300/20 blur-[100px]' />
          <div className='absolute bottom-[10%] left-[20%] h-[30vh] w-[30vw] rounded-full bg-emerald-300/20 blur-[120px]' />
        </div>

        <QueryProvider>
          <div className='font-sora relative flex min-h-dvh w-full max-w-[1440px] flex-col'>
            <ToastProvider>
              <div className='sticky top-0 z-40 border-b bg-white/80 backdrop-blur'>
                <Header />
              </div>

              <main className='flex flex-1'>
                <div className='flex flex-1 space-y-6'>{children}</div>
              </main>

              {/* footer */}
              <footer className='border-t bg-white/60'>
                <div className='mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8'>
                  <div className='flex h-14 items-center justify-between text-xs text-gray-500'>
                    <span>© {new Date().getFullYear()} DREAM TRIO</span>
                    {/* <div className='flex items-center gap-3'>
                      <a className='hover:text-gray-700' href='#'>
                        도움말
                      </a>
                      <span className='text-gray-300'>•</span>
                      <a className='hover:text-gray-700' href='#'>
                        이용약관
                      </a>
                    </div> */}
                  </div>
                </div>
              </footer>
            </ToastProvider>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
