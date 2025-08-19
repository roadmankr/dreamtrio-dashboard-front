'use server';

import { getErrorMessage } from '@/lib/error';
import { apis } from '@/shared/api/endpoints';
import { serverKy } from '@/shared/api/ky/ky.server';

export const dashboardUpload = async (formData: FormData) => {
  try {
    const [url, init] = apis.upload.dashboardUpload;
    const result = await serverKy(url, { ...init, body: formData }).json();

    return result;
  } catch (err: unknown) {
    throw new Error(await getErrorMessage(err));
  }
};
