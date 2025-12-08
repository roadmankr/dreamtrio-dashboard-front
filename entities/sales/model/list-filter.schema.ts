import { storeIdRequiredSchema } from '@/entities/stores/model/id.schema';
import { yearMonthDateSchema } from '@/shared/date/schema';
import { DIMENSION_VALUES } from '@/shared/model/dimension';

import z from 'zod';

export const salesListFilterSchema = z.object({
  saleDate: yearMonthDateSchema,
  storeId: storeIdRequiredSchema,
  dimension: z.enum(DIMENSION_VALUES, {
    error: (issue) => {
      if (issue.code === 'invalid_value')
        return '올바른 타입 파라메터가 아닙니다';
      return issue.message;
    },
  }),
});
