'use client';

import { useSearchParams } from 'next/navigation';

const useStoreDateSearchParams = () => {
  const searchParams = useSearchParams();
  const storeName = searchParams.get('storeName') ?? '';
  const saleDate = searchParams.get('saleDate') ?? '';
  return { storeName, saleDate };
};

export default useStoreDateSearchParams;
