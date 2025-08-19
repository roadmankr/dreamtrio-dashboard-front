import { getMonthOptions } from '@/features/sales-date-options/model/lib';
import { FormDataType } from '@/shared/types/form';
import { TStoreDateFilter } from './schema';

export const storeDateFormFields: FormDataType<TStoreDateFilter>[] = [
  { name: 'storeName', label: '매장', type: 'select', options: [] },
  { name: 'saleDate', label: '매장', type: 'select', options: [] },
];

export const storeFormFields: FormDataType<TStoreDateFilter> = {
  name: 'storeName',
  label: '매장',
  type: 'select',
  options: [],
  isSearchMode: true,
};

export const saleDateFormFields: FormDataType<TStoreDateFilter> = {
  name: 'saleDate',
  label: '연월',
  type: 'select',
  options: getMonthOptions(),
};
