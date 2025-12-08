'use client';

import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import NoResultTable from '@/components/ui/table/no-result-table';
import { TableSkeletonRows } from '@/components/ui/table/TableSkeleton';
import { defaultParse } from '@/lib/form';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@/shared/types/table';

type SelectionProps<T> = {
  isAllSelected: boolean;
  toggleAll: () => void;
  selected: Set<T>;
  toggleOne: (id: T) => void;
  getRowId: (row: any) => T;
};

type CommonDataTableProps<T, K> = {
  rows: T[];
  columns: ColumnDef<T>[];
  /** key 추출기 (React key & selection에 사용) */
  getRowId: (row: T) => K;
  /** 행 hover 등 커스텀 */
  rowClassName?: (row: T) => string | undefined;
  /** thead sticky 여부 (기본 true) */
  stickyHeader?: boolean;
  /** 선택 체크박스 컬럼 추가 (옵션) */
  selection?: SelectionProps<K>;
  /** 표 전체 className 커스텀 */
  className?: string;
  /** 헤더 행 className */
  headerRowClassName?: string;
  isPending?: boolean;
};

export function CommonDataTable<T, K>({
  rows,
  columns,
  getRowId,
  rowClassName,
  selection,
  stickyHeader = true,
  className,
  headerRowClassName,
  isPending,
}: CommonDataTableProps<T, K>) {
  return (
    <Table className={cn('w-full text-sm', className)}>
      <TableHeader
        className={cn(stickyHeader && 'sticky top-0 z-10 bg-zinc-50')}
      >
        <TableRow className={cn('ext-xs text-zinc-500', headerRowClassName)}>
          {columns.map((col, idx) =>
            col.renderType === 'checkbox' ? (
              <TableHead
                key={idx}
                className={cn(
                  `w-10 px-2 py-2`,
                  stickyHeader && 'sticky top-0 z-20',
                )}
              >
                <Input
                  aria-label='Select all rows'
                  type='checkbox'
                  className='size-4 accent-zinc-800'
                  onChange={selection?.toggleAll}
                  checked={selection?.isAllSelected}
                />
              </TableHead>
            ) : (
              <TableHead
                key={idx}
                className={cn(
                  'px-2 py-2 font-medium',
                  col.widthClassName,
                  col.thClassName,
                  col.align === 'right' && 'text-right',
                  col.align === 'center' && 'text-center',
                  stickyHeader && 'sticky top-0 z-20',
                )}
              >
                {col.header}
              </TableHead>
            ),
          )}
        </TableRow>
      </TableHeader>

      <TableBody className='divide-y divide-zinc-100'>
        {isPending ? (
          <TableSkeletonRows padY='py-3' colLength={columns.length} />
        ) : rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length} className='p-3'>
              <NoResultTable />
            </TableCell>
          </TableRow>
        ) : (
          rows.map((row) => {
            const id = getRowId(row);
            return (
              <TableRow
                key={`${id}`}
                className={cn('hover:bg-transparent', rowClassName?.(row))}
              >
                {columns.map((col, idx) => {
                  if (col.renderType === 'checkbox') {
                    return (
                      <TableCell key={`chk-${idx}`} className='px-2 py-2'>
                        <Input
                          type='checkbox'
                          className='size-4 accent-zinc-800'
                          checked={selection?.selected.has(id)}
                          onChange={() => selection?.toggleOne?.(id)}
                        />
                      </TableCell>
                    );
                  }

                  if (col.renderType === 'component') {
                    return (
                      <TableCell
                        key={idx}
                        className={cn('px-2 py-2', col.tdClassName)}
                      >
                        {col.render(row)}
                      </TableCell>
                    );
                  }

                  const value = row[col.accessor];
                  return (
                    <TableCell
                      key={idx}
                      className={cn('px-2 py-2', col.tdClassName)}
                    >
                      {col?.format
                        ? defaultParse(String(value), col.format)
                        : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
