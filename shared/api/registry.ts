/**
 * universalFetch에서 필요한 api config
 * server와 client용으로 되어 있으며
 * 서버는 actions/* 에 서버액션용으로 정의
 * 클라는 api/* 즉 route handler를 호출하며 그 안에서 서버와 동일한 서버액션 함수를 호출.
 *
 */

import { getProductByBarcodeInServer } from '@/actions/product.server';
import {
  getSalesBreakDownInServer,
  uploadSalesFile,
} from '@/actions/sales.server';
import {
  getStoreDetailInServer,
  getStoreListInServer,
} from '@/actions/store.server';
import type { ActionDef } from '@/shared/types/http';

type ApiRegistrySpec = {
  getSalesBreakDown: ActionDef<typeof getSalesBreakDownInServer>;
  getStoreList: ActionDef<typeof getStoreListInServer>;
  getStoreDetail: ActionDef<typeof getStoreDetailInServer>;
  uploadSalesFile: ActionDef<typeof uploadSalesFile, 'POST'>;
  getProductByBarcode: ActionDef<typeof getProductByBarcodeInServer, 'GET'>;
};

export const apiRegistry = {
  getSalesBreakDown: {
    server: async () =>
      (await import('@/actions/sales.server')).getSalesBreakDownInServer,
    client: { path: '/api/sales', method: 'GET' as const },
  },
  getStoreList: {
    server: async () =>
      (await import('@/actions/store.server')).getStoreListInServer,
    client: { path: '/api/store', method: 'GET' as const },
  },
  getStoreDetail: {
    server: async () =>
      (await import('@/actions/store.server')).getStoreDetailInServer,
    client: { path: '/api/store/:storeId', method: 'GET' as const },
  },
  uploadSalesFile: {
    server: async () =>
      (await import('@/actions/sales.server')).uploadSalesFile,
    client: { path: '/api/sales', method: 'POST' as const },
  },
  getProductByBarcode: {
    server: async () =>
      (await import('@/actions/product.server')).getProductByBarcodeInServer,
    client: { path: '/api/products', method: 'GET' as const },
  },
} as const satisfies ApiRegistrySpec;

export type TApiRegistry = typeof apiRegistry;
