import { EndpointBuilder } from '@/shared/types/api';
import { Options } from 'ky';

export const upload = {
  dashboardUpload: (formData: FormData) =>
    [`file/upload/sales`, { method: 'POST', body: formData }] as const,
  analyzeUpload: ({
    storeId,
    saleDate,
    formData,
  }: {
    storeId: number;
    saleDate: string;
    formData: FormData;
  }): [url: string, options: Options] =>
    [
      `file/upload/sales/analyze`,
      { method: 'POST', searchParams: { storeId, saleDate }, body: formData },
    ] as const,
} as const satisfies Record<string, EndpointBuilder>;
