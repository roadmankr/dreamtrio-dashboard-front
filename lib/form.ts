import { SelectOption, TFormValue } from '@/shared/types/form';
import { formatBizNumber, formatDateString, formatPhoneNumber } from './format';

export const getDefaultValueForFieldType = (
  type: string,
  options?: SelectOption[],
): any => {
  switch (type) {
    case 'text':
    case 'label':
    case 'date':
      return '';
    case 'checkbox':
      return false;
    case 'number':
      return 0;
    case 'select':
      return options?.[0].value || '';
    default:
      return '';
  }
};

export const defaultParse = (value: string, type?: TFormValue): any => {
  const v = String(value);

  switch (type) {
    case 'number':
      const inputValue = v.trim().replace(/[\D]/gi, '');
      return inputValue ? Number(inputValue) : '';
    case 'decimal':
      return value
        .replace(/[^0-9.]/g, '') // 숫자와 점(.)만 허용
        .replace(/^(\d*\.\d{2}).*$/, '$1') // 소수점 2자리까지만 유지
        .replace(/(\..*)\./g, '$1'); // 소수점 하나만 허용
    case 'regNum':
      return formatBizNumber(v);
    case 'date':
      return formatDateString(v);
    case 'phone':
      return formatPhoneNumber(v);
    case 'currency':
      return v.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    case 'percent':
      return v.replace(/[^0-9]/g, '').replace(/^(100|[1-9]?[0-9])$/, '$1');
    default:
      return value;
  }
};

/**
 * form에서 valueType에 따라 value를 변환해서 parse 해주는 함수
 * @param value  기존에 입력받은 value
 * @param valueType parse할 value
 * @returns 변환된 value
 */
export const getParseFieldValue = (value: string, valueType?: TFormValue) => {
  return defaultParse(value, valueType) ?? '';
};

export function isFormData(value: unknown): value is FormData {
  return (
    typeof value === 'object' &&
    typeof FormData !== 'undefined' &&
    value instanceof FormData
  );
}

export function hasFormDataProp(x: any): x is { formData: FormData } {
  return (
    x &&
    typeof x === 'object' &&
    'formData' in x &&
    x.formData instanceof FormData
  );
}

export const nf = new Intl.NumberFormat('ko-KR');
