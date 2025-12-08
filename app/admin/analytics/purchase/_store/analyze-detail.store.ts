import { initialAnalyzeDetailFilter } from '@/app/admin/analytics/purchase/_config/filter.config';
import { TPurchaseAnalyticsInputFilter } from '@/app/admin/analytics/purchase/_schema/filter.schema';
import { create } from 'zustand';

interface Store {
  filters: TPurchaseAnalyticsInputFilter;
  setFilters: (filters: TPurchaseAnalyticsInputFilter) => void;
  reset: () => void;
}

export const analyzeDetailFilterStore = create<Store>((set) => ({
  filters: initialAnalyzeDetailFilter,
  setFilters: (filters) => set({ filters }),
  reset: () => set({ filters: initialAnalyzeDetailFilter }),
}));
