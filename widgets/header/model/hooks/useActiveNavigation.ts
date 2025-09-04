import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

const useActiveNavigation = () => {
  const pathname = usePathname();

  const isActive = useCallback(
    (url: string) => {
      return pathname.startsWith(url);
    },
    [pathname],
  );

  return { isActive };
};

export default useActiveNavigation;
