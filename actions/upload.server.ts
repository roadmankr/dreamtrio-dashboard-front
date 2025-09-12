'use server';

import { getErrorMessage } from '@/lib/error';
import { apis } from '@/shared/api/endpoints';
import { serverKy } from '@/shared/api/ky/ky.server';
import { TOrderAnalyze } from '@/shared/types/analyze';

export const uploadOrderEvaluatorFileInServer = async (props: {
  storeId: number;
  saleDate: string;
  formData: FormData;
}) => {
  try {
    const result = await serverKy(
      ...apis.upload.analyzeUpload(props),
    ).json<TOrderAnalyze>();

    return result;
  } catch (err: unknown) {
    throw new Error(await getErrorMessage(err));
  }
};
