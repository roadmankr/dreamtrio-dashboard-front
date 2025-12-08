import { storeIdRequiredSchema } from '@/entities/stores/model/id.schema';
import dayjs from '@/lib/dayjs';
import { fullDateSlashSchema } from '@/shared/date/schema';
import z from 'zod';

const dateRangeSchema = z
  .object({
    from: fullDateSlashSchema,
    to: fullDateSlashSchema,
  })
  .refine(({ from, to }) => dayjs(from).isBefore(dayjs(to), 'day'), {
    message: '종료일은 시작일 이후여야 합니다.',
  });

export const purchaseAnalyticsFilterSchema = z.object({
  storeId: storeIdRequiredSchema,
  range: dateRangeSchema,
});

export type TPurchaseAnalyticsFilter = z.infer<
  typeof purchaseAnalyticsFilterSchema
>;

export type TPurchaseAnalyticsInputFilter = z.input<
  typeof purchaseAnalyticsFilterSchema
>;

export type TPurchaseAnalyticsOutputFilter = z.output<
  typeof purchaseAnalyticsFilterSchema
>;
