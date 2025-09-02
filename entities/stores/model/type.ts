import { TSalesBreakDownResponse } from '@/shared/types/sales';

export type TStoreOptimal = {
  currentStockCost: number;
  optimalStockCost: number;
};

export type TSelectedStore = {
  age: TSalesBreakDownResponse[];
  gender: TSalesBreakDownResponse[];
  brand: TSalesBreakDownResponse[];
  optimal: TStoreOptimal;
  storeId: number;
  storeName: string;
};

export type TStore = {
  id: number;
  name: string;
  managerName: string;
  address: string;
  detailAddress: string;
  phoneNum: string;
};
