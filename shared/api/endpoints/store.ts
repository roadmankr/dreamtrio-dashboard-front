export const store = {
  getStoreList: [`store/list`, { method: 'get' }] as const,
  getStoreDetail: (storeId: number) =>
    [`store/optimal?storeId=${storeId}`, { method: 'get' }] as const,
} as const;
