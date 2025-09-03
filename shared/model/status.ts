const VIEW_STATE_VALUES = [
  'idle',
  'pending',
  'success',
  'empty',
  'error',
] as const;
export type ViewState = (typeof VIEW_STATE_VALUES)[number];

export const ViewState = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
  EMPTY: 'empty',
  ERROR: 'error',
} as const satisfies Record<Uppercase<ViewState>, ViewState>;
