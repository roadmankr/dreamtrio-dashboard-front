import dayjs from '@/lib/dayjs';
import z from 'zod';

export const storeDateFilterSchema = z.object({
  storeName: z.string().optional(),
  saleDate: z
    .string()
    .refine(
      (v) => dayjs(v, 'YYYY-MM', true).isValid(),
      'YYYY-MM 형식이어야 합니다.',
    )
    .transform((v) => (v ? dayjs(v).format('YYYY-MM') : v)),
});

export type TStoreDateFilter = z.infer<typeof storeDateFilterSchema>;
