import { ROUTES } from '@/shared/constants/routes';

export const navigations = [
  { text: '구매분석', url: ROUTES.PURCHASE_EVALUATOR },
  { text: '대쉬보드', url: ROUTES.DASHBOARD },
  { text: '파일 업로드', url: ROUTES.UPLOAD },
] as const;
