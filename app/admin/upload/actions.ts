"use server";

import { baseApi } from "@/lib/api";
import { getErrorMessage } from "@/lib/error";
import { returnResponseBlob } from "@/lib/http";
import { apis } from "@/shared/api/endpoints";

export const dashboardUpload = async (formData: FormData) => {
  try {
    const [url, init] = apis.upload.dashboardUpload
    const response = await baseApi(url, { ...init, body: formData });

    return returnResponseBlob(response);
  } catch (err: unknown) {
    throw new Error(await getErrorMessage(err));
  }
 
}