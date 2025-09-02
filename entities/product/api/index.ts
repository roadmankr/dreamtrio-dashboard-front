import { universalFetcher } from '@/shared/api/ky/universalFetcher';

export const getProductByBarcode = async (barcode: string, storeId: number) =>
  universalFetcher('getProductByBarcode', { barcode, storeId });
