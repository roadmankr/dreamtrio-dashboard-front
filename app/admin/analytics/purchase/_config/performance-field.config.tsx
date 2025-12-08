import {
  TAnalyzeGradeProfit,
  TAnalyzeSalesConfig,
} from '@/shared/types/analyze';
import { TFormValue } from '@/shared/types/form';

export const salesOverviewFieldConfig = [
  { label: '매입수량', key: 'inboundQty', format: 'currency' },
  { label: '매입원가', key: 'inboundAmount', format: 'currency' },
  { label: '매출수량', key: 'outboundQty', format: 'currency' },
  { label: '매출금액', key: 'inboundAmount', format: 'currency' },
  { label: '소진율', key: 'consumptionRate', format: 'decimal' },
  { label: '매출이익액', key: 'salesProfit', format: 'currency' },
  { label: '이익률', key: 'profitRate', format: 'decimal' },
] as const satisfies TAnalyzeSalesConfig[];

export const profitAnalysisFieldConfig = [
  { label: '잔여수량', key: 'remainingQty', format: 'currency' },
  { label: '잔여원가', key: 'remainingCost', format: 'currency' },
  { label: '총 매출 이익액', key: 'totalSalesProfit', format: 'currency' },
  { label: '이익률', key: 'totalProfitRate', format: 'decimal' },
  { label: '원가회수율', key: 'costRecoveryRate', format: 'decimal' },
] as const satisfies {
  label: string;
  key: keyof TAnalyzeGradeProfit;
  format: TFormValue;
}[];
