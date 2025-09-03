'use client';

import useTransitionRouter from '@/features/navigation/model/useTransitionRouter';
import { getMonthOptions } from '@/features/sales-date-options/model/lib';
import type { Dimension } from '@/shared/model/dimension';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

const useStoreDateSearchParams = () => {
  const pathname = usePathname();
  const { push } = useTransitionRouter();
  const searchParams = useSearchParams();
  const storeId = searchParams.get('storeId') ?? '';
  const dimension = (searchParams.get('dimension') as Dimension) ?? '';
  const saleDate =
    searchParams.get('saleDate') ?? getMonthOptions()?.[1].value ?? '';

  const resetParams = useCallback(() => {
    push(pathname);
  }, [push, pathname]);

  const returnStoreID = useMemo(() => (storeId ? +storeId : null), [storeId]);

  return { storeId: returnStoreID, saleDate, resetParams, dimension };
};

export default useStoreDateSearchParams;
