'use server';

import { UploadFile } from '@/app/admin/upload/_config';
import { apis } from '@/shared/api/endpoints';
import { requestApiJsonOrThrow } from '@/shared/api/request/request.server';

export const uploadSalesFileInServer = async ({
  uploadType,
  formData,
}: {
  uploadType: UploadFile;
  formData: FormData;
}) => {
  const [url, options] = apis.sales.uploadSalesFile({ uploadType, formData });
  return await requestApiJsonOrThrow<number>(url, options);
};
