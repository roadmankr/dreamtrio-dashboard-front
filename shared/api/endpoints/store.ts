export const store = {
  getStoreList: [`store/list`, { method: 'get' }] as const,
  getStoreDetail: (storeId: number) =>
    [`store/optimal`, { method: 'get', searchParams: { storeId } }] as const,
} as const;
