import { clintKy } from '@/shared/api/ky/ky.client';
import {
  TSalesBreakDownQuery,
  TSalesBreakDownResponse,
} from '@/shared/types/sales';

export const getSalesBreakDown = async ({
  saleDate,
  storeName,
  dimension,
}: TSalesBreakDownQuery) => {
  if (typeof window === 'undefined') {
    const { getSalesBreakDownInServer } = await import(
      '@/actions/sales.server'
    );
    return getSalesBreakDownInServer({ saleDate, storeName, dimension });
  } else {
    const result = await clintKy
      .get(
        `/api/sales?storeName=${storeName}&saleDate=${saleDate}&dimension=${dimension}`,
      )
      .json<{ data: TSalesBreakDownResponse[] }>();
    return result.data;
  }
};
