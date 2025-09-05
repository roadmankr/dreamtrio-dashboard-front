export const ROUTES = {
  UPLOAD: '/admin/upload' as const,
  DASHBOARD: '/admin/dashboard' as const,
  PURCHASE_EVALUATOR: '/admin/purchase-evaluator' as const,
} as const;

export const MAIN_URL = ROUTES.DASHBOARD;
