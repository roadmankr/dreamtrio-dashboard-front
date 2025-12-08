import { create } from 'zustand';

export type TSelectedAnalyticsId = string;

interface Store {
  selected: TSelectedAnalyticsId[];
  setSelected: (selected: TSelectedAnalyticsId[]) => void;
  reset: () => void;
}

export const selectedVoucherAnalyticsStore = create<Store>((set) => ({
  selected: [],
  setSelected: (selected) => set({ selected }),
  reset: () => set({ selected: [] }),
}));
