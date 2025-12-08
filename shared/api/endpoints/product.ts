import { EndpointBuilder } from '@/shared/types/api';

export const product = {
  getProductByBarcode: (barcode: string, storeId: number) =>
    [
      `store/product`,
      { method: 'GET', searchParams: { barcode, storeId } },
    ] as const,
  getProductByBarcodeInClient: (barcode: string, storeId: number) =>
    [
      'products',
      { method: 'GET', searchParams: { barcode, storeId } },
    ] as const,
} as const satisfies Record<string, EndpointBuilder>;
