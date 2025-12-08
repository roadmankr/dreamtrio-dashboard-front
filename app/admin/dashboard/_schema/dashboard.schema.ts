import { storeIdRequiredSchema } from '@/entities/stores/model/id.schema';
import { yearMonthDateSchema } from '@/shared/date/schema';
import z from 'zod';

export const storeDateFilterSchema = z.object({
  storeId: storeIdRequiredSchema,
  saleDate: yearMonthDateSchema,
});

export type TStoreDateFilter = z.infer<typeof storeDateFilterSchema>;
export type TStoreDateFilterInput = z.input<typeof storeDateFilterSchema>;
export type TStoreDateFilterOutput = z.output<typeof storeDateFilterSchema>;
