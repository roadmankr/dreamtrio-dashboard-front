'use server';

import { apis } from '@/shared/api/endpoints';
import { requestApiJson } from '@/shared/api/request/request.server';

export const getProductByBarcodeInServer = async ({
  barcode,
  storeId,
}: {
  barcode: string;
  storeId: number;
}) => {
  return await requestApiJson(
    ...apis.product.getProductByBarcode(barcode, storeId),
  );
};
