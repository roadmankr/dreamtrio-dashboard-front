'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { toast, Toaster } from 'sonner';

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const runningRef = useRef(false);

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
      />
      {children}
    </>
  );
};

export default ToastProvider;
