"use server";

import 'server-only';
import z from 'zod';
import { dashboardUploadSchema } from '../_schema';

export const validateDashboardUpload = async (formData: FormData) => {
  const parsed = dashboardUploadSchema.safeParse({
    file: formData.get("file"),
    password: String(formData.get("password") ?? ""),
  })

   if (!parsed.success) {
    return { ok: false, zod: z.flattenError(parsed.error) };
   }
  
  const SECRET = process.env.DASHBOARD_UPLOAD_PASSWORD ?? '';
  if (!SECRET || SECRET !== parsed.data.password) {
    return { ok: false, fieldErrors: { password: ["비밀번호가 일치하지 않습니다."] } };
  }

  return true;
}