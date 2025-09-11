import dayjs from '@/lib/dayjs';
import z from 'zod';

export const storeDateFilterSchema = z.object({
  storeId: z
    .number()
    .nullable()
    .transform((v) => (v ? +v : null)),
  saleDate: z
    .string()
    .refine(
      (v) => dayjs(v, 'YYYY-MM', true).isValid(),
      'YYYY-MM 형식이어야 합니다.',
    )
    .transform((v) => (v ? dayjs(v).format('YYYY-MM') : v)),
});

export type TStoreDateFilter = z.infer<typeof storeDateFilterSchema>;
export type TStoreDateFilterInput = z.input<typeof storeDateFilterSchema>;
export type TStoreDateFilterOutput = z.output<typeof storeDateFilterSchema>;
