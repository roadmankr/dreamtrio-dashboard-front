import type { Dimension } from '@/shared/model/dimension';
import { create } from 'zustand';

interface ScrollStore {
  successDimensions: Dimension[];
  setSuccessDimensions: (dimension: Dimension) => void;
  resetSuccessDimensions: () => void;
}

export const queryStringScrollStore = create<ScrollStore>((set) => ({
  successDimensions: [],
  resetSuccessDimensions: () =>
    set((state) => ({ ...state, successDimensions: [] })),
  setSuccessDimensions: (dimension) =>
    set((state) => ({
      ...state,
      successDimensions: [...state.successDimensions, dimension],
    })),
}));
