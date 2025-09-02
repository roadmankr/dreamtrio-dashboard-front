import { createQueryKeys } from '@lukemorales/query-key-factory';
import { TSalesBreakDownQuery } from '../types/sales';

export const sales = createQueryKeys('sales', {
  getSales: ({ saleDate, dimension, storeId }: TSalesBreakDownQuery) => ({
    queryKey: ['storeList', saleDate, dimension, { storeId: storeId ?? 0 }],
  }),
});
