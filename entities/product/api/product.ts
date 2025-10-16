import { TProduct } from '@/entities/product/model/type';
import { requestApiForGet } from '@/shared/api/request/request.client';

export const getProductByBarcode = async (barcode: string, storeId: number) => {
  return await requestApiForGet<TProduct>('/api/products', {
    method: 'get',
    searchParams: { barcode, storeId },
  });
};
