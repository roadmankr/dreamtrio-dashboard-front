import { fmt, fmtPercent } from '@/lib/format';
import { cn } from '@/lib/utils';
import { TSalesBreakDownResponse } from '@/shared/types/sales';
import useDashboardTableData from '../../_model/useDashboardTableData';

type Props = {
  data: TSalesBreakDownResponse[];
  topN?: number; // 상위 N개 (매출 기준)
};

export default function DashboardTable({ data }: Props) {
  const { totals } = useDashboardTableData({ data });

  // 이익률 배지 색상
  const rateTone = (rate: number) => {
    if (rate >= 0.3) return { bg: 'bg-emerald-100', text: 'text-emerald-700' };
    if (rate >= 0.2) return { bg: 'bg-teal-100', text: 'text-teal-700' };
    if (rate >= 0.1) return { bg: 'bg-sky-100', text: 'text-sky-700' };
    if (rate > 0.0) return { bg: 'bg-slate-100', text: 'text-slate-700' };
    return { bg: 'bg-rose-100', text: 'text-rose-700' };
  };

  return (
    <div className='mt-4 rounded-xl border border-gray-100 bg-white text-[var(--font-size-fluid)] shadow-sm'>
      <div className='px-3 pt-2'>
        <div className='mb-2 flex items-center gap-2'>
          <span className='inline-block h-1.5 w-full rounded-full bg-gradient-to-r from-sky-300 via-emerald-300 to-slate-200' />
        </div>
      </div>

      <div className='w-full'>
        <table className='min-w-full border-separate border-spacing-0'>
          <thead className='sticky top-0 z-10 bg-white'>
            <tr className='[&>th]:px-3 [&>th]:py-2 [&>th]:font-semibold [&>th]:text-gray-500'>
              <th className='sticky left-0 bg-white text-left'>상품명</th>
              <th className='text-right'>총 매출액</th>
              <th className='text-right'>이익액</th>
              <th className='text-right'>이익률</th>
              <th className='pr-4 text-right'>구성비(이익/매출)</th>
            </tr>
          </thead>

          <tbody className='[&>tr>td]:px-3 [&>tr>td]:py-2'>
            {data.map((r, i) => {
              const tone = rateTone(r.profitRate / 100);
              const percent = Math.min(100, r.profitRate);
              return (
                <tr
                  key={r.name}
                  className='border-b border-gray-100 hover:bg-slate-50/60'
                >
                  {/* 상품명 */}
                  <td className='sticky left-0 bg-white/80 text-sm text-gray-800 backdrop-blur'>
                    <div className='flex items-center gap-2'>
                      <span className='inline-flex h-5 w-5 items-center justify-center rounded bg-sky-100 text-[10px] font-semibold text-sky-700'>
                        {i + 1}
                      </span>
                      <span className='truncate'>{r.name}</span>
                    </div>
                    {/* <div className='mt-0.5 text-[11px] text-gray-500'>
                      총매출: {fmt(r.totalPrice)}
                    </div> */}
                  </td>

                  {/* 매출액 */}
                  <td className='text-right font-mono text-sm text-gray-800 tabular-nums'>
                    {fmt(r.totalPrice)}
                  </td>

                  {/* 이익액 */}
                  <td className='text-right font-mono text-sm text-gray-800 tabular-nums'>
                    {fmt(r.profitPrice)}
                  </td>

                  {/* 이익률 배지 */}
                  <td className='text-right'>
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${tone.bg} ${tone.text}`}
                    >
                      {`${r.profitRate}%`}
                    </span>
                  </td>

                  {/* 구성비 미니 바(Progress) */}
                  <td className='pr-4'>
                    <div className='flex items-center justify-end gap-2'>
                      <div className='h-2 w-28 rounded-full bg-slate-100'>
                        <div
                          className='h-2 rounded-full bg-emerald-400'
                          style={{ width: `${percent > 0 ? percent : 0}%` }}
                        />
                      </div>
                      <span
                        className={cn(
                          `w-10 text-right text-[11px] text-gray-500`,
                          percent < 0 && 'text-rose-700',
                        )}
                      >
                        {percent.toFixed(0)}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>

          {/* 합계 행 */}
          <tfoot>
            <tr className='bg-slate-50/70'>
              <td className='px-3 py-3 text-left text-sm font-semibold text-gray-700'>
                합계
              </td>
              <td className='px-3 py-3 text-right font-mono text-sm font-bold text-gray-800 tabular-nums'>
                {fmt(totals.total)}
              </td>
              <td className='px-3 py-3 text-right font-mono text-sm font-bold text-gray-800 tabular-nums'>
                {fmt(totals.profit)}
              </td>
              <td className='px-3 py-3 text-right text-sm font-bold text-gray-800'>
                {fmtPercent(totals.rate)}
              </td>
              <td className='flex items-center justify-end gap-3 px-3 py-3 pr-4 text-xs font-semibold'>
                <div className='inline-flex h-2 w-28 rounded-full bg-slate-200'>
                  <div
                    className='h-2 rounded-full bg-emerald-500'
                    style={{ width: `${Math.min(100, totals.rate * 100)}%` }}
                  />
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
