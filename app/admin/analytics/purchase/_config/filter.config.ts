import { TPurchaseAnalyticsInputFilter } from '@/app/admin/analytics/purchase/_schema/filter.schema';
import dayjs from '@/lib/dayjs';
import { CommonFormPart, FormDateType } from '@/shared/types/form';

export const initialAnalyzeDetailFilter = {
  storeId: null,
  range: {
    to: dayjs().toDate(),
    from: dayjs().startOf('month').toDate(),
  },
} as const satisfies TPurchaseAnalyticsInputFilter;

export const purchaseAnalyticsDateField = {
  name: 'range',
  type: 'dateRange',
  label: '기간',
  placeholder: '기간 선택',
} as const satisfies FormDateType &
  CommonFormPart<TPurchaseAnalyticsInputFilter>;
