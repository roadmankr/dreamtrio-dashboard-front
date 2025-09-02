'use client';

import useTransitionRouter from '@/features/navigation/model/useTransitionRouter';
import { getMonthOptions } from '@/features/sales-date-options/model/lib';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const useStoreDateSearchParams = () => {
  const pathname = usePathname();
  const { push } = useTransitionRouter();
  const searchParams = useSearchParams();
  const storeName = searchParams.get('storeName') ?? '';
  const saleDate =
    searchParams.get('saleDate') ?? getMonthOptions()?.[1].value ?? '';

  const resetParams = useCallback(() => {
    push(pathname);
  }, [push, pathname]);

  return { storeName, saleDate, resetParams };
};

export default useStoreDateSearchParams;
