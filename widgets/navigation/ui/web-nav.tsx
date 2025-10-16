'use client';

import { cn } from '@/lib/utils';

import { navigations } from '@/widgets/navigation/model/config';
import useActiveNavigation from '@/widgets/navigation/model/useActiveNavigation';
import Link from 'next/link';

const WebNav = () => {
  const { isActive } = useActiveNavigation();
  return (
    <ul className='hidden items-center gap-8 md:flex'>
      {navigations.map((item) => (
        <Link
          key={item.url}
          href={item.url}
          className={cn(
            `rounded-full px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600`,
            isActive(item.url) && 'bg-blue-50 font-bold text-blue-600',
          )}
        >
          <li>{item.text}</li>
        </Link>
      ))}
    </ul>
  );
};

export default WebNav;
