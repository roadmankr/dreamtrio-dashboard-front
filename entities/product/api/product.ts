import { TProduct } from '@/entities/product/model/type';
import { apis } from '@/shared/api/endpoints';
import { requestApiInClient } from '@/shared/api/request/request.client';

export const getProductByBarcode = async (barcode: string, storeId: number) => {
  const [url, init] = apis.product.getProductByBarcodeInClient(
    barcode,
    storeId,
  );
  return await requestApiInClient<TProduct>(url, {
    ...init,
    mode: 'route',
  });
};
