'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { navigations } from '../model/config';
import useActiveNavigation from '../model/hooks/useActiveNavigation';

const Header = () => {
  const { isActive } = useActiveNavigation();

  return (
    // <header className='sticky top-0 z-50 w-full bg-white shadow-md'>
    <header className='flex h-16 w-full bg-white shadow-md'>
      <div className='flex w-full items-center justify-between px-6 py-3'>
        {/* Logo */}
        <Link
          href={'/'}
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

        {/* Desktop Navigation */}
        <nav className='hidden items-center gap-8 md:flex'>
          {navigations.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className={cn(
                `rounded-full px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600`,
                isActive(item.url) && 'bg-blue-50 font-bold text-blue-600',
              )}
            >
              {item.text}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button className='md:hidden'>
          <span className='block h-1 w-6 rounded bg-gray-700'></span>
          <span className='mt-1 block h-1 w-6 rounded bg-gray-700'></span>
          <span className='mt-1 block h-1 w-6 rounded bg-gray-700'></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
