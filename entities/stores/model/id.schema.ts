import {
  makeOptionalPositiveIntNullable,
  makePositiveInt,
} from '@/shared/schema/number';

export const storeIdOptionalSchema =
  makeOptionalPositiveIntNullable('매장을 선택해주세요');

export const storeIdRequiredSchema = makePositiveInt('매장을 선택해주세요');
