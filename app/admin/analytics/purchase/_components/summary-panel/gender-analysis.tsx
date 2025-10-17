import {
  Card,
  CardBody,
  CardHeader,
} from '@/app/admin/analytics/purchase/_components/card-layout';

export default function GenderAnalysis() {
  const rows = [
    { rank: 1, segment: '남아', purchase: '50%', sales: '50%' },
    { rank: 2, segment: '여아', purchase: '30%', sales: '30%' },
    { rank: 3, segment: '공용', purchase: '20%', sales: '20%' },
  ];

  return (
    <Card>
      <CardHeader title='성별 분석' />
      <CardBody>
        <table className='w-full text-sm'>
          <thead>
            <tr className='text-xs text-zinc-500'>
              <th className='py-2 text-left font-medium'>순위</th>
              <th className='py-2 text-left font-medium'>구매</th>
              <th className='py-2 text-left font-medium'>판매</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-zinc-100'>
            {rows.map((r) => (
              <tr key={r.rank} className='hover:bg-zinc-50/60'>
                <td className='py-2'>{r.rank}</td>
                <td className='py-2'>{`${r.segment} (${r.purchase})`}</td>
                <td className='py-2'>{`${r.segment} (${r.sales})`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
