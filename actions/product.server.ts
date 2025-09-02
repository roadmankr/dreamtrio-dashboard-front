'use server';

import { TProduct } from '@/entities/product/model/type';
import { getErrorMessage } from '@/lib/error';
import { apis } from '@/shared/api/endpoints';
import { serverKy } from '@/shared/api/ky/ky.server';

export const getProductByBarcodeInServer = async ({
  barcode,
  storeId,
}: {
  barcode: string;
  storeId: number;
}) => {
  try {
    const result = await serverKy(
      ...apis.product.getProductByBarcode(barcode, storeId),
    ).json<TProduct>();

    return result;
  } catch (err: unknown) {
    throw new Error(await getErrorMessage(err));
  }
};
