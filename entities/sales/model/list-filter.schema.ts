import { storeIdOptionalSchema } from '@/entities/stores/model/id.schema';
import dayjs from '@/lib/dayjs';
import { DIMENSION_VALUES } from '@/shared/model/dimension';

import z from 'zod';

export const salesListFilterSchema = z.object({
  saleDate: z.string().refine((v) => dayjs(v, 'YYYY-MM', true).isValid(), {
    error: '날짜를 선택해주세요',
  }),
  storeId: storeIdOptionalSchema,
  dimension: z.enum(DIMENSION_VALUES, {
    error: (issue) => {
      if (issue.code === 'invalid_value')
        return '올바른 타입 파라메터가 아닙니다';
      return issue.message;
    },
  }),
});
