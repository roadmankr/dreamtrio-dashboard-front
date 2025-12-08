import z from 'zod';
import { BARCODE_KEY, STORE_KEY } from '../_constants';

export const searchStoreSchema = z.object({
  [STORE_KEY]: z.string().trim().min(1, {}),
});
export type TSearchStore = z.infer<typeof searchStoreSchema>;

export const searchProductForBarcodeSchema = z.object({
  [BARCODE_KEY]: z.string().trim().min(1, {}),
});
export type TSearchProduct = z.infer<typeof searchProductForBarcodeSchema>;
