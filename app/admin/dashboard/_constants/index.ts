import type { Dimension } from '@/shared/model/dimension';
import { DIMENSION } from '@/shared/model/dimension';

export const dashboadProductTitleConfig = {
  [DIMENSION.AGE]: '나이',
  [DIMENSION.ANIMATION]: '애니메이션',
  [DIMENSION.BRAND]: '브랜드',
  [DIMENSION.GENDER]: '성별',
  [DIMENSION.LARGE_CATEGORY]: '대분류',
  [DIMENSION.MEDIUM_CATEGORY]: '중분류',
  [DIMENSION.PRODUCT]: '상품분류',
  [DIMENSION.SMALL_CATEGORY]: '소분류',
} satisfies Record<Dimension, string>;
