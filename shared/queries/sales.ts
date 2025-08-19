import { createQueryKeys } from '@lukemorales/query-key-factory';
import { TSalesBreakDownQuery } from '../types/sales';

export const sales = createQueryKeys('sales', {
  getSales: ({ saleDate, storeName, dimension }: TSalesBreakDownQuery) => ({
    queryKey: ['storeList', saleDate, storeName, dimension],
  }),
});
