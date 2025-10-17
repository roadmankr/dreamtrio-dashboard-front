import { TPurchaseAnalyticsInputFilter } from '@/app/admin/analytics/purchase/_schema/filter.schema';
import { CommonFormPart, FormDateType } from '@/shared/types/form';

export const purchaseAnalyticsDateField = {
  name: 'range',
  type: 'dateRange',
  label: '기간',
  placeholder: '기간 선택',
} as const satisfies FormDateType &
  CommonFormPart<TPurchaseAnalyticsInputFilter>;
