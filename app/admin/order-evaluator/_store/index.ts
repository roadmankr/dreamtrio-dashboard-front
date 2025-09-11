import { create } from 'zustand';
import { TAnalyticsProduct } from '../_types';

interface Store {
  isUploading: boolean;
  setUploading: (isUploading: boolean) => void;
  orderAnalytics: TAnalyticsProduct[];
  setOrderAnalytics: (list: TAnalyticsProduct[]) => void;
  resetOrderAnalytics: () => void;
}

export const orderAnalyticsStore = create<Store>((set) => ({
  isUploading: false,
  setUploading: (isUploading) => set((state) => ({ ...state, isUploading })),
  orderAnalytics: [],
  setOrderAnalytics: (orderAnalytics) =>
    set((state) => ({ ...state, orderAnalytics })),
  resetOrderAnalytics: () =>
    set((state) => ({ ...state, orderAnalytics: [], isUploading: false })),
}));
