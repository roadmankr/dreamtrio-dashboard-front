import { storeIdRequiredSchema } from '@/entities/stores/model/id.schema';
import z from 'zod';

export const productListFilterSchema = z.object({
  barcode: z.string().min(1, { error: '바코드가 존재하지 않습니다' }),
  storeId: storeIdRequiredSchema,
});
