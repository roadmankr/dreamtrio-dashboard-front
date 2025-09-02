'use client';

import useTransitionRouter from '@/features/navigation/model/useTransitionRouter';
import { getMonthOptions } from '@/features/sales-date-options/model/lib';
import { DIMENSION } from '@/shared/types/sales';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';

const useStoreDateSearchParams = () => {
  const pathname = usePathname();
  const { push } = useTransitionRouter();
  const searchParams = useSearchParams();
  const storeId = searchParams.get('storeId') ?? '';
  const dimension = (searchParams.get('dimension') as DIMENSION) ?? '';
  const saleDate =
    searchParams.get('saleDate') ?? getMonthOptions()?.[1].value ?? '';

  const resetParams = useCallback(() => {
    push(pathname);
  }, [push, pathname]);

  useEffect(() => {
    setTimeout(() => {
      const id = requestAnimationFrame(() => {
        const el = document.querySelector<HTMLElement>(
          `[data-section="${dimension}"]`,
        );
        console.log(el);
        if (!el) return;

        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });

      return () => cancelAnimationFrame(id);
    }, 0);
  }, [dimension]);

  const returnStoreID = useMemo(() => (storeId ? +storeId : null), [storeId]);

  return { storeId: returnStoreID, saleDate, resetParams, dimension };
};

export default useStoreDateSearchParams;
