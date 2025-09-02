import { UploadFile, UploadFileMap } from '@/app/admin/upload/_config';
import { buildQuery } from '@/lib/http';
import { TSalesBreakDownQuery } from '@/shared/types/sales';

export const sales = {
  getSalesBreakDown: ({ saleDate, storeId, dimension }: TSalesBreakDownQuery) =>
    [
      `sales/breakdown${buildQuery({ saleDate, storeId, dimension })}`,
      { method: 'GET' },
    ] as const,
  uploadSalesFile: ({
    uploadType = UploadFileMap.STOCK,
    formData,
  }: {
    uploadType: UploadFile;
    formData: FormData;
  }) =>
    [`file/upload/${uploadType}`, { method: 'POST', body: formData }] as const,
} as const;
