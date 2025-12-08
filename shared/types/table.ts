import { TFormValue } from '@/shared/types/form';

type Align = 'left' | 'right' | 'center';

export type ColumnDef<T> = {
  header: React.ReactNode | string;
  align?: Align;
  thClassName?: string;
  tdClassName?: string;
  widthClassName?: string;
} & (
  | { renderType: 'checkbox' }
  | { renderType: 'component'; render: (row: T) => React.ReactNode }
  | { renderType: 'text'; accessor: keyof T; format?: TFormValue }
);
