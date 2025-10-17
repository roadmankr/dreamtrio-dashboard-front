import { TProduct } from '@/entities/product/model/type';
import { requestApiForActions } from '@/shared/api/request/request.client';

export const getProductByBarcode = async (barcode: string, storeId: number) => {
  return await requestApiForActions<TProduct>('/api/products', {
    method: 'get',
    searchParams: { barcode, storeId },
  });
};
