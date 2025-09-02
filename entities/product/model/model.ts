import { useQuery } from '@tanstack/react-query';
import { productQueries } from './queries';

export const useProductByBarcode = (barcode: string, storeId: number) =>
  useQuery({
    ...productQueries.byBarcode(barcode, storeId),
    enabled: !!barcode,
  });
