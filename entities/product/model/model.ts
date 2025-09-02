import { useQuery } from '@tanstack/react-query';
import { productQueries } from './queries';

export const useProductByBarcode = (barcode: string) =>
  useQuery({
    ...productQueries.byBarcode(barcode),
    enabled: !!barcode,
  });
