import { DIMENSION } from '@/shared/types/sales';

export const dashboadProductTitleConfig = {
  [DIMENSION.AGE]: '나이',
  [DIMENSION.ANIMATION]: '애니메이션',
  [DIMENSION.BRAND]: '브랜드',
  [DIMENSION.GENDER]: '성별',
  [DIMENSION.LAGE_CATEGORY]: '대분류',
  [DIMENSION.MEDIUM_CATEGORY]: '중분류',
  [DIMENSION.PRODUCT]: '상품분류',
  [DIMENSION.SMALL_CATEGORY]: '소분류',
} satisfies Record<DIMENSION, string>;
