'use client';

import { clientKy } from '@/shared/api/ky/ky.client';
import { TOrderAnalyze } from '@/shared/types/analyze';
import { TAnalyticsUploadProps } from './_types';

export const uploadAnalysticsFile = async (props: TAnalyticsUploadProps) => {
  const { data } = await clientKy
    .post('/api/upload/analytics', {
      body: props.formData,
      searchParams: { storeId: props.storeId, saleDate: props.saleDate },
      timeout: 60000,
      retry: 0,
    })
    .json<{ data: TOrderAnalyze }>();

  return data;
};
