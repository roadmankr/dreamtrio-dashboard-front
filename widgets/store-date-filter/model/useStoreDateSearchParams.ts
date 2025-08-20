'use client';

import { getMonthOptions } from '@/features/sales-date-options/model/lib';
import { useSearchParams } from 'next/navigation';

const useStoreDateSearchParams = () => {
  const searchParams = useSearchParams();
  const storeName = searchParams.get('storeName') ?? '';
  const saleDate =
    searchParams.get('saleDate') ?? getMonthOptions()?.[1].value ?? '';

  return { storeName, saleDate };
};

export default useStoreDateSearchParams;
