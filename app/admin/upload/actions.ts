import { universalFetcher } from '@/shared/api/ky/universalFetcher';
import { UploadFile } from './_config';

export const dashboardUpload = async ({
  uploadType,
  formData,
}: {
  uploadType: UploadFile;
  formData: FormData;
}) => {
  return universalFetcher('uploadSalesFile', { uploadType, formData });
};
