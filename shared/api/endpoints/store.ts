import { EndpointBuilder } from '@/shared/types/api';

export const store = {
  getStoreList: [`store/list`, { method: 'GET' }] as const,
  getStoreDetail: (storeId: number) =>
    [`store/optimal`, { method: 'GET', searchParams: { storeId } }] as const,
} as const satisfies Record<string, EndpointBuilder>;
