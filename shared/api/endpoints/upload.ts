import { Options } from 'ky';

export const upload = {
  dashboardUpload: (formData: FormData) =>
    [`file/upload/sales`, { method: 'post', body: formData }] as const,
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
      { method: 'post', searchParams: { storeId, saleDate }, body: formData },
    ] as const,
} as const;
