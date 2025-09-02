'use server';

import { UploadFile } from '@/app/admin/upload/_config';
import { getErrorMessage } from '@/lib/error';
import { apis } from '@/shared/api/endpoints';
import { serverKy } from '@/shared/api/ky/ky.server';
import {
  TSalesBreakDownQuery,
  TSalesBreakDownResponse,
} from '@/shared/types/sales';

export const getSalesBreakDownInServer = async ({
  saleDate,
  storeId,
  dimension,
}: TSalesBreakDownQuery) => {
  try {
    const result = await serverKy(
      ...apis.sales.getSalesBreakDown({ saleDate, storeId, dimension }),
    ).json<TSalesBreakDownResponse[]>();

    return result;
  } catch (err: unknown) {
    throw new Error(await getErrorMessage(err));
  }
};

export const uploadSalesFile = async ({
  uploadType,
  formData,
}: {
  uploadType: UploadFile;
  formData: FormData;
}) => {
  try {
    const [url, options] = apis.sales.uploadSalesFile({ uploadType, formData });
    const result = await serverKy(url, options).json<number>();

    return result;
  } catch (err: unknown) {
    throw new Error(await getErrorMessage(err));
  }
};
