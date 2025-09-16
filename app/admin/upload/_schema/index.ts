import { excelFileTypeSchema, zipFileTypeSchema } from '@/shared/schema/file';
import z from 'zod';
import { UploadFileMap } from '../_config';

// export const dashboardUploadSchema = z.object({
//   uploadType: z.enum(uploadFileValues),
//   file: excelFileTypeSchema,
//   password: z
//     .string()
//     .trim() // 앞뒤 공백 제거
//     .min(1, { message: '비밀번호를 입력해주세요.' }),
// });
const passwordSchema = z
  .string()
  .trim()
  .min(1, { message: '비밀번호를 입력해주세요.' });

// 판별 유니온
export const dashboardUploadSchema = z.discriminatedUnion('uploadType', [
  z.object({
    uploadType: z.literal(UploadFileMap.STOCK),
    file: excelFileTypeSchema,
    password: passwordSchema,
  }),
  z.object({
    uploadType: z.literal(UploadFileMap.STOCK_ZIP),
    file: zipFileTypeSchema,
    password: passwordSchema,
  }),
  z.object({
    uploadType: z.literal(UploadFileMap.SALES),
    file: excelFileTypeSchema,
    password: passwordSchema,
  }),
]);

export type TDashboardUpload = z.infer<typeof dashboardUploadSchema>;
