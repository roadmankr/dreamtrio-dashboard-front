'use client';
import { MAIN_URL } from '@/shared/constants/routes';
import Image from 'next/image';
import Link from 'next/link';

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className='flex h-16 w-full bg-white shadow-md'>
      <div className='flex w-full items-center justify-between px-6 py-3'>
        <Link
          href={MAIN_URL}
          className='relative flex aspect-[5/1] h-full cursor-pointer items-center gap-3'
        >
          <Image
            src='/assets/images/logo.png'
            alt='Dream Trio'
            fill
            sizes='100%'
            priority
          />
        </Link>
        {children}
      </div>
    </header>
  );
};

export default Header;
