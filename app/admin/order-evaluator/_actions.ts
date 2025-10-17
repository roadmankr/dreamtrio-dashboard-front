'use server';

import { apis } from '@/shared/api/endpoints';
import { requestApiJsonOrThrow } from '@/shared/api/request/request.server';
import { TOrderAnalyze } from '@/shared/types/analyze';

// 발주평가 파일
export const uploadOrderEvaluatorFileInServer = async (props: {
  storeId: number;
  saleDate: string;
  formData: FormData;
}) => {
  return await requestApiJsonOrThrow<TOrderAnalyze>(
    ...apis.upload.analyzeUpload(props),
  );
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
