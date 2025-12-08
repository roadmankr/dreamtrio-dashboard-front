import { TAnalyzeSalesGradeReturn } from '@/shared/types/analyze';
import { create } from 'zustand';

interface Store {
  performanceAnalytics: TAnalyzeSalesGradeReturn | null;
  setPerformance: (performance: TAnalyzeSalesGradeReturn | null) => void;
  reset: () => void;
  isPending?: boolean;
  setPending?: (pending: boolean) => void;
}

export const performanceAnalyticsStore = create<Store>((set) => ({
  performanceAnalytics: null,
  setPerformance: (performance) =>
    set((state) => ({ ...state, performanceAnalytics: performance })),
  reset: () => set({ performanceAnalytics: null }),
  isPending: false,
  setPending: (pending) => set((state) => ({ ...state, isPending: pending })),
}));
