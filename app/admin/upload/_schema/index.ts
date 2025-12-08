import { excelFileTypeSchema, zipFileTypeSchema } from '@/shared/file/schema';
import z from 'zod';
import { UploadFileMap } from '../_config';

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
  z.object({
    uploadType: z.literal(UploadFileMap.MASTER),
    file: excelFileTypeSchema,
    password: passwordSchema,
  }),
]);

export type TDashboardUpload = z.infer<typeof dashboardUploadSchema>;
