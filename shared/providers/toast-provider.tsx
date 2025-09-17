'use client';

import { debounce } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { toast, Toaster } from 'sonner';

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const runningRef = useRef(false);
  const [right, setRight] = useState(16);

  useEffect(() => {
    function update() {
      const max = 1440; // 컨테이너 최대폭
      const basePadding = 16; // 컨테이너 px-4 등
      const gutter = Math.max((window.innerWidth - max) / 2 + basePadding, 16);
      setRight(gutter);
    }

    const onResizeDebounced = debounce(update);

    onResizeDebounced();
    window.addEventListener('resize', onResizeDebounced);
    return () => window.removeEventListener('resize', onResizeDebounced);
  }, []);

  useEffect(() => {
    if (!runningRef.current) {
      runningRef.current = true;
      return;
    }
    toast.dismiss();
  }, [pathname]);

  return (
    <>
      <Toaster
        richColors
        className='pointer-events-auto z-50 touch-manipulation select-text'
        offset={{ bottom: 24, right }}
        mobileOffset={{ bottom: 16, right: 16 }}
      />
      {children}
    </>
  );
};

export default ToastProvider;
