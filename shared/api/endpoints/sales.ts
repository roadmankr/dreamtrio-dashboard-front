import { TSalesBreakDownQuery } from '@/shared/types/sales';

export const sales = {
  getSalesBreakDown: ({
    saleDate,
    storeName,
    dimension,
  }: TSalesBreakDownQuery) =>
    [
      `sales/breakdown?storeName=${storeName}&saleDate=${saleDate}&dimension=${dimension}`,
      { method: 'get' },
    ] as const,
} as const;
