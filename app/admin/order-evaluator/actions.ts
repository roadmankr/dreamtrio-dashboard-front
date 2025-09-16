'use client';

import { universalFetcher } from '@/shared/api/ky/universalFetcher';
import { TAnalyticsUploadProps } from './_types';

export const uploadAnalysticsFile = async (props: TAnalyticsUploadProps) => {
  return await universalFetcher('uploadAnalysticsFile', { ...props });
  // const { data } = await clientKy
  //   .post('/api/upload/analytics', {
  //     body: props.formData,
  //     searchParams: { storeId: props.storeId, saleDate: props.saleDate },
  //     timeout: 60000,
  //     retry: 0,
  //   })
  //   .json<{ data: TOrderAnalyze }>();

  // return data;
};
