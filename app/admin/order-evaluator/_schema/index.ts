import dayjs from '@/lib/dayjs';
import { excelFileTypeSchema } from '@/shared/schema/file';
import z from 'zod';

export const orderEvaluatorFileUploadSchema = z.object({
  storeId: z
    .number()
    .nullable()
    .transform((v) => (v ? +v : null))
    .refine((v) => v, { message: '매장을 선택해주세요' }),
  saleDate: z
    .string()
    .refine(
      (v) => dayjs(v, 'YYYY-MM', true).isValid(),
      'YYYY-MM 형식이어야 합니다.',
    )
    .transform((v) => (v ? dayjs(v).format('YYYY-MM') : v)),
  file: excelFileTypeSchema,
});

export type TOrderUpload = z.infer<typeof orderEvaluatorFileUploadSchema>;
