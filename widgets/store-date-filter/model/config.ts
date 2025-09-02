import { getMonthOptions } from '@/features/sales-date-options/model/lib';
import { FormDataType } from '@/shared/types/form';
import { FieldPath } from 'react-hook-form';
import { TStoreDateFilter } from './schema';

export const storeDateFormFields: Record<
  FieldPath<TStoreDateFilter>,
  FormDataType<TStoreDateFilter>
> = {
  storeId: {
    name: 'storeId',
    label: '매장',
    type: 'select',
    options: [],
    isSearchMode: true,
  },
  saleDate: {
    name: 'saleDate',
    label: '매장',
    type: 'select',
    options: getMonthOptions(),
  },
} as const;
