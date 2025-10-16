import { UploadFile, UploadFileMap } from '@/app/admin/upload/_config';
import { Options } from 'ky';

export const sales = {
  getSalesBreakDown: (): [url: string, options: Options] =>
    [
      // `sales/breakdown${buildQuery({ saleDate, storeId, dimension })}`,
      `sales/breakdown`,
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
