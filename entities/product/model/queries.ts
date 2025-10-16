import { queries } from '@/shared/queries';
import { queryOptions } from '@tanstack/react-query';
import { getProductByBarcode } from '../api/product';

export const productQueries = {
  // byId: (id: string) =>
  //   queryOptions({
  //     queryKey: productKeys.byId(id),
  //     queryFn: () => getProductById(id),
  //     staleTime: 30_000,
  //   }),
  byBarcode: (barcode: string, storeId: number) =>
    queryOptions({
      queryKey: queries.product.getProductByBarcode(barcode, storeId).queryKey,
      queryFn: () => getProductByBarcode(barcode, storeId),
      staleTime: 30_000,
    }),
  // list: (p: { page?: number; size?: number; q?: string }) =>
  //   queryOptions({
  //     queryKey: productKeys.list(p),
  //     queryFn: () => getProductList(p),
  //     staleTime: 15_000,
  //   }),
} as const;
