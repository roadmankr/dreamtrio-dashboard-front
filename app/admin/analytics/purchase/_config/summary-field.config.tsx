import { TAnalyzeDetailSummaryConfig } from '@/shared/types/analyze';

export const summaryFieldConfig: TAnalyzeDetailSummaryConfig[] = [
  { label: '총 구매금액', key: 'inboundSum', format: 'currency' },
  { label: '판매율', key: 'saleRate' },
  { label: '매출이익', key: 'salesProfit' },
  {
    label: '타매장 매입대비 판매율',
    key: 'anotherSaleRate',
    format: 'decimal',
  },
  {
    label: '타매장 대비 매출이익',
    key: 'anotherSalesProfit',
    format: 'decimal',
  },
  { label: '잔여재고', key: 'stockSum', format: 'currency' },
] as const;
