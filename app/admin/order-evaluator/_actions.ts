'use server';

import { getErrorMessage } from '@/lib/error';
import { apis } from '@/shared/api/endpoints';
import { serverKy } from '@/shared/api/ky/ky.server';
import { TOrderAnalyze } from '@/shared/types/analyze';

// 발주평가 파일
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

// export const uploadAnalysticsFile = async (props: {
//   storeId: number;
//   saleDate: string;
//   formData: FormData;
// }) => {
//   const { data } = await serverKy
//     .post('/api/upload/analytics', {
//       body: props.formData,
//       searchParams: { storeId: props.storeId, saleDate: props.saleDate },
//       timeout: 60000,
//       retry: 0,
//     })
//     .json<{ data: TOrderAnalyze }>();

//   return data;
// };
