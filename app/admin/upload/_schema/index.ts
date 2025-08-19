import { excelFileTypeSchema } from '@/shared/schema/file';
import z from 'zod';

export const dashboardUploadSchema = z.object({
  file: excelFileTypeSchema,
  password:z.string()
  .trim()  // 앞뒤 공백 제거
  .min(1, { message: "비밀번호를 입력해주세요." })
})

export type TDashboardUpload = z.infer<typeof dashboardUploadSchema>;