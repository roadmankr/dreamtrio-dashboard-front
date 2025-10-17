import {
  Card,
  CardBody,
  CardHeader,
} from '@/app/admin/analytics/purchase/_components/card-layout';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';

export default function BrandAnalysis() {
  const rows = Array.from({ length: 10 }).map((_, i) => ({
    rank: i + 1,
    purchase: `브랜드${i + 1} (비중)`,
    sales: `브랜드${i + 1} (비중)`,
  }));

  return (
    <Card>
      <CardHeader title='브랜드 분석 TOP 10' />
      <CardBody>
        <div className='max-h-64 min-h-0 overflow-y-auto rounded-xl border border-zinc-100'>
          <table className='w-full text-sm'>
            <thead className='sticky top-0 z-10 bg-zinc-50'>
              <tr className='text-xs text-zinc-500'>
                <th className='sticky left-0 px-2 py-2 text-left font-medium'>
                  순위
                </th>
                <th className='py-2 text-left font-medium'>구매</th>
                <th className='py-2 text-left font-medium'>판매</th>
              </tr>
            </thead>
            <TableBody className='divide-y divide-zinc-100'>
              {rows.map((r) => (
                <TableRow key={r.rank} className='hover:bg-zinc-50/60'>
                  <TableCell className='px-2 py-2'>{r.rank}</TableCell>
                  <TableCell className='py-2'>{r.purchase}</TableCell>
                  <TableCell className='py-2'>{r.sales}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
