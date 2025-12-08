'use server';

import { apis } from '@/shared/api/endpoints';
import { requestApiInServer } from '@/shared/api/request/request.server';
import { TOrderAnalyze } from '@/shared/types/analyze';

// 발주평가 파일
export const uploadOrderEvaluatorFileInServer = async (props: {
  storeId: number;
  saleDate: string;
  formData: FormData;
}) => {
  return await requestApiInServer<TOrderAnalyze>(
    ...apis.upload.analyzeUpload(props),
  );
};
