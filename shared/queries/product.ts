import { createQueryKeys } from '@lukemorales/query-key-factory';

export const product = createQueryKeys('product', {
  getProductByBarcode: (barcode, storeId) => ({
    queryKey: ['byBarcode', barcode, storeId],
  }),
});
