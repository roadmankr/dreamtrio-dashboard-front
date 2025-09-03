import { ViewState } from '@/shared/model/status';
import { FormDataType } from '@/shared/types/form';
import { BARCODE_KEY, STORE_KEY } from '../_constants';
import { TSearchProduct, TSearchStore } from '../_schema';

export const searchStoreFormField = {
  label: '매장',
  placeholder: '매장 선택',
  options: [],
  type: 'select',
  name: STORE_KEY,
} satisfies FormDataType<TSearchStore>;

export const searchProductFormField = {
  label: '상품검색',
  placeholder: '바코드 입력',
  type: 'text',
  name: BARCODE_KEY,
} satisfies FormDataType<TSearchProduct>;

export const searchProductFormDefaultValues = { [BARCODE_KEY]: '' } as const;

export const colorConfig = {
  green: {
    bg: 'bg-green-500',
    text: 'text-green-600',
    border: 'border-green-500',
  },
  yellow: {
    bg: 'bg-yellow-500',
    text: 'text-yellow-600',
    border: 'border-yellow-500',
  },
  red: { bg: 'bg-red-500', text: 'text-red-600', border: 'border-red-500' },
  gray: { bg: 'bg-gray-300', text: 'text-gray-600', border: 'border-gray-300' }, // 검색 전
} as const;

export const labelByStatus: Record<ViewState, string> = {
  [ViewState.IDLE]: '검색 전',
  [ViewState.PENDING]: '검색 중',
  [ViewState.SUCCESS]: '검색 성공',
  [ViewState.ERROR]: '검색 실패',
  [ViewState.EMPTY]: '검색 실패',
};

export const CART_TABLE_COLS = ['', '9rem', '7.5rem', '10rem', '6rem'] as const;
