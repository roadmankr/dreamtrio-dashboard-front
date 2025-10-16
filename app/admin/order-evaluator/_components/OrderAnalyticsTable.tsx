'use client';

import { Badge } from '@/components/ui/badge';
import CardWrapper from '@/components/ui/card/card-wrapper';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import AnalyticsLight from '@/entities/commerce-analytics/ui/AnalyticsLight';
import { nf } from '@/lib/form';
import useOrderAnalyticsContorl from '../_hooks/useOrderAnalyticsContorl';
import { SkeletonRows } from './TableSkeleton';

const OrderAnalyticsTable = () => {
  const {
    totalLength,
    orderAnalytics,
    isPending,
    totalInfo,
    totalRateStockColorInfo,
    totalRateSaleColorInfo,
    totalRateOptimalColorInfo,
  } = useOrderAnalyticsContorl();

  return (
    <CardWrapper className='w-full'>
      {/* Header */}
      <div className='flex items-center justify-between gap-3 px-4 py-3'>
        <div className='flex items-center gap-2'>
          <h2 className='text-base font-semibold text-neutral-900'>
            결과 리스트
          </h2>
          <span className='rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600'>
            {isPending ? '로딩중' : `${totalLength.toLocaleString()}건`}
          </span>
        </div>
      </div>

      <div className='w-full min-w-0 overscroll-x-auto px-4'>
        <Table className='w-full min-w-[720px] border-collapse sm:min-w-full'>
          <TableHeader className='sticky top-0 z-10 bg-neutral-50/95 backdrop-blur supports-[backdrop-filter]:bg-neutral-50/60'>
            <TableRow className='text-sm tracking-wide text-neutral-600 uppercase'>
              <TableHead className='w-[10rem] min-w-[10rem]'>바코드</TableHead>
              <TableHead className='min-w-2xs'>상품명</TableHead>
              <TableHead className='w-[6.4rem] min-w-[6.4rem] text-right'>
                발주수량
              </TableHead>
              <TableHead className='w-[9rem] min-w-[9rem] text-right'>
                단가
              </TableHead>
              <TableHead className='w-[7rem] min-w-[7rem] text-center'>
                재고회전율
              </TableHead>
              <TableHead className='w-[7rem] min-w-[7rem] text-center'>
                판매율
              </TableHead>
              <TableHead className='w-[7rem] min-w-[7rem] text-center'>
                적정재고
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isPending ? (
              <SkeletonRows padY='py-3' />
            ) : orderAnalytics.length === 0 ? (
              <TableRow className='hover:bg-transparent data-[state=selected]:bg-transparent'>
                <TableCell colSpan={7} className='px-6 py-16 text-center'>
                  <div className='w-full rounded-xl border border-dashed p-12 text-neutral-500'>
                    업로드 후 결과가 여기에 표시됩니다.
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              orderAnalytics.map((g, gi) => (
                <TableRow key={`${g.barcode}-${gi}`}>
                  <TableCell>{g.barcode}</TableCell>

                  <TableCell>
                    <div className='line-clamp-1 flex gap-2 text-sm text-neutral-800'>
                      {g.new && (
                        <Badge className='bg-red-500 text-xs text-white'>
                          신상품
                        </Badge>
                      )}
                      {g.productName}
                    </div>
                  </TableCell>

                  <TableCell className='text-right'>
                    {nf.format(g.quantity)}
                  </TableCell>

                  <TableCell className='text-right'>
                    {nf.format(g.price)}
                  </TableCell>

                  <TableCell className='text-center'>
                    <AnalyticsLight {...g.stockRateSignal.colorInfo} />
                  </TableCell>

                  <TableCell className='text-center'>
                    <AnalyticsLight {...g.saleRateSignal.colorInfo} />
                  </TableCell>

                  <TableCell className='text-center'>
                    <AnalyticsLight {...g.optimalStockSignal.colorInfo} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>

          {!isPending && orderAnalytics.length > 0 && (
            <TableFooter className='bg-neutral-50/80'>
              <TableRow>
                <TableCell
                  className='border-t border-neutral-200 py-3 text-right text-sm font-medium text-neutral-700'
                  colSpan={2}
                >
                  합계
                </TableCell>

                <TableCell className='border-t border-neutral-200 py-3 text-right font-semibold tabular-nums'>
                  {nf.format(totalInfo.totalQty)}
                </TableCell>

                <TableCell className='border-t border-neutral-200 py-3 text-right font-semibold tabular-nums'>
                  {nf.format(totalInfo.totalPrice * totalInfo.totalQty)}
                </TableCell>

                <TableCell className='text-center'>
                  <AnalyticsLight {...totalRateStockColorInfo} />
                </TableCell>

                <TableCell className='text-center'>
                  <AnalyticsLight {...totalRateSaleColorInfo} />
                </TableCell>

                <TableCell className='text-center'>
                  <AnalyticsLight {...totalRateOptimalColorInfo} />
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>
    </CardWrapper>
  );
};

export default OrderAnalyticsTable;
