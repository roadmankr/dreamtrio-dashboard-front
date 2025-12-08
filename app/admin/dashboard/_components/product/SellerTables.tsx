import DashboardCard from '@/app/admin/dashboard/_components/common/DashboardCard';

export type BestSellerRow = {
  rank: number;
  name: string;
  barcode: string;
  qty: number;
  sales: number; // 매출(원)
  profit: number; // 매출이익(원)
  marginRate: number; // 이익률(0~1)
};

export const bestSellers: BestSellerRow[] = [
  {
    rank: 1,
    name: '디즈니 튜피씨',
    barcode: '681147052390',
    qty: 76,
    sales: 5_912_340,
    profit: 1_812_556,
    marginRate: 0.31,
  },
  {
    rank: 2,
    name: '슈팅스타 스타팩트',
    barcode: '8802080530172',
    qty: 35,
    sales: 3_194_130,
    profit: 580_730,
    marginRate: 0.18,
  },
  {
    rank: 3,
    name: '슈팅스타 우루북 경쟁장',
    barcode: '8802058030022',
    qty: 28,
    sales: 2_482_466,
    profit: 453_516,
    marginRate: 0.18,
  },
  {
    rank: 4,
    name: '슈팅스타 챔스티션의 개슴',
    barcode: '8809655849992',
    qty: 28,
    sales: 2_311_600,
    profit: 452_000,
    marginRate: 0.2,
  },
  {
    rank: 5,
    name: '슈팅스타 우루벌 네깅',
    barcode: '8809655848955',
    qty: 32,
    sales: 2_131_400,
    profit: 405_120,
    marginRate: 0.19,
  },
  {
    rank: 6,
    name: '타요 친쿠로 긴급출동센터',
    barcode: '8809644091281',
    qty: 37,
    sales: 2_181_320,
    profit: 405_620,
    marginRate: 0.19,
  },
  {
    rank: 7,
    name: '슈팅스타 우루벌디 러크스',
    barcode: '8809644091023',
    qty: 27,
    sales: 2_183_900,
    profit: 625_120,
    marginRate: 0.29,
  },
  {
    rank: 8,
    name: '딕스터스 뉴슈자켓+미니가모',
    barcode: '5058041647617',
    qty: 27,
    sales: 2_114_700,
    profit: 544_550,
    marginRate: 0.26,
  },
  {
    rank: 9,
    name: '71846 까마의 나이트 로봇',
    barcode: '5702019781594',
    qty: 12,
    sales: 1_868_900,
    profit: 456_336,
    marginRate: 0.24,
  },
  {
    rank: 10,
    name: '60367 여객기',
    barcode: '5702017416274',
    qty: 12,
    sales: 1_820_597,
    profit: 407_909,
    marginRate: 0.22,
  },
];

const SellerTables = () => {
  return (
    <DashboardCard title='베스트셀러/스테디셀러 안내'>
      {/* <div className='grid grid-cols-1 gap-4 md:grid-cols-2'> */}
      <div className='grid grid-cols-1 gap-4'>
        <BestSellerTable title='베스트셀러' />
        <BestSellerTable title='스테디셀러' />
      </div>
    </DashboardCard>
  );
};

export default SellerTables;

// BestSellerTable.tsx

const fmt = (n: number) => n.toLocaleString('ko-KR');
const pct = (r: number) => `${Math.round(r * 100)}%`;

function BestSellerTable({
  rows = bestSellers,
  title = '베스트셀러',
}: {
  rows?: BestSellerRow[];
  title?: string;
}) {
  return (
    <section className='rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900'>
      <h3 className='mb-3 text-base font-semibold text-zinc-900 dark:text-zinc-100'>
        {title}
      </h3>

      <div className='overflow-x-auto'>
        <table className='w-full table-fixed border-collapse text-sm'>
          <colgroup>
            <col className='w-12' /> {/* 순위 */}
            <col /> {/* 상품명 */}
            <col className='w-40' /> {/* 바코드 */}
            <col className='w-24' /> {/* 판매수량 */}
            <col className='w-28' /> {/* 매출 */}
            <col className='w-28' /> {/* 매출이익 */}
            <col className='w-16' /> {/* 이익률 */}
          </colgroup>

          <thead>
            <tr className='border-b border-zinc-200 text-xs text-zinc-500 dark:border-zinc-800'>
              <th className='py-2 text-left font-medium'>순위</th>
              <th className='py-2 text-left font-medium'>상품명</th>
              <th className='py-2 text-left font-medium'>바코드</th>
              <th className='py-2 text-right font-medium'>판매수량</th>
              <th className='py-2 text-right font-medium'>매출</th>
              <th className='py-2 text-right font-medium'>매출이익</th>
              <th className='py-2 text-right font-medium'>이익률</th>
            </tr>
          </thead>

          <tbody className='divide-y divide-zinc-100 dark:divide-zinc-800'>
            {rows.map((r) => (
              <tr
                key={r.rank}
                className='hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40'
              >
                <td className='py-2 pr-2 tabular-nums'>{r.rank}</td>
                <td className='truncate py-2 pr-2'>{r.name}</td>
                <td className='py-2 pr-2 font-mono text-[13px] text-zinc-600 dark:text-zinc-300'>
                  {r.barcode}
                </td>
                <td className='py-2 pl-2 text-right tabular-nums'>
                  {fmt(r.qty)}
                </td>
                <td className='py-2 pl-2 text-right tabular-nums'>
                  {fmt(r.sales)}
                </td>
                <td className='py-2 pl-2 text-right tabular-nums'>
                  {fmt(r.profit)}
                </td>
                <td className='py-2 pl-2 text-right tabular-nums'>
                  <span
                    className={[
                      'rounded-md px-1.5 py-0.5',
                      r.marginRate >= 0.25
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                        : r.marginRate >= 0.18
                          ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                          : 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
                    ].join(' ')}
                  >
                    {pct(r.marginRate)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 바닥 메타/총합이 필요하면 여기에 추가 */}
    </section>
  );
}
