export const ROUTES = {
  UPLOAD: '/admin/upload' as const,
  DASHBOARD: '/admin/dashboard' as const,
  PURCHASE_ANALYTICS: '/admin/analytics/purchase' as const,
  PURCHASE_ORDER_EVALUATION: '/admin/evaluation/purchase-order' as const,
  PURCHASE_EVALUATOR: '/admin/purchase-evaluator' as const,
  ORDER_EVALUATOR: '/admin/order-evaluator' as const,
} as const;

export const MAIN_URL = ROUTES.DASHBOARD;
