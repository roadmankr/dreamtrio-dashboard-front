import {
  Card,
  CardBody,
  CardHeader,
} from '@/app/admin/analytics/purchase/_components/card-layout';
import useReceiptTableState from '@/app/admin/analytics/purchase/_hooks/useReceiptTableState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';

export default function ReceiptTable() {
  const { rows, selected, isAllSelected, toggleAll, toggleOne } =
    useReceiptTableState();

  return (
    <Card>
      <div className='flex items-center justify-between py-2 pr-5'>
        <CardHeader title='전표 선택' />
        <Button
          type='button'
          disabled={selected.size === 0}
          aria-disabled={selected.size === 0}
          aria-label='선택된 전표 분석'
          className='cursor-pointer'
        >
          전표 분석
        </Button>
      </div>
      <CardBody className='w-full'>
        <div className='max-h-60 min-h-0 max-w-full overflow-x-auto overflow-y-auto rounded-xl border border-zinc-100'>
          <table className='w-full text-sm'>
            <thead className='sticky top-0 z-10 bg-zinc-50'>
              <tr className='text-xs text-zinc-500'>
                <th className='sticky w-10 px-4 py-2 text-left font-medium'>
                  <Input
                    type='checkbox'
                    className='size-4 accent-zinc-800'
                    onChange={toggleAll}
                    checked={isAllSelected}
                  />
                </th>
                <th className='px-4 py-2 text-left font-medium'>전표별</th>
                <th className='px-4 py-2 text-right font-medium'>수량</th>
                <th className='px-4 py-2 text-right font-medium'>공급가액</th>
                <th className='px-4 py-2 text-right font-medium'>부가세</th>
                <th className='px-4 py-2 text-right font-medium'>합계</th>
              </tr>
            </thead>
            <TableBody className='divide-y divide-zinc-100'>
              {rows.map((r) => (
                <TableRow key={r.id} className='hover:bg-zinc-50/60'>
                  <TableCell className='px-4 py-2'>
                    <Input
                      type='checkbox'
                      checked={selected.has(r.id)}
                      className='size-4 accent-zinc-800'
                      onChange={() => toggleOne(r.id)}
                    />
                  </TableCell>
                  <TableCell
                    className={`px-4 py-2 ${r.strong ? 'font-semibold text-zinc-900' : ''}`}
                  >
                    {r.id}
                  </TableCell>
                  <TableCell className='px-4 py-2 text-right tabular-nums'>
                    {r.qty}
                  </TableCell>
                  <TableCell className='px-4 py-2 text-right tabular-nums'>
                    {r.supply}
                  </TableCell>
                  <TableCell className='px-4 py-2 text-right tabular-nums'>
                    {r.vat}
                  </TableCell>
                  <TableCell className='px-4 py-2 text-right tabular-nums'>
                    {r.total}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
