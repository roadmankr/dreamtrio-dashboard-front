import { TAnalytisSignal } from '@/entities/commerce-analytics/model/type';
import { TProduct } from '@/entities/product/model/type';
import { TFormValue } from '@/shared/types/form';

export type TOrderAnalyze = {
  storeId: number;
  saleDate: string;
  productInfo: TProduct[];
  stockRateSignal: TAnalytisSignal;
  saleRateSignal: TAnalytisSignal;
  optimalStockSignal: TAnalytisSignal;
};

export type TAnalyzeRanking = {
  inbound: string[];
  outbound: string[];
};

export type TAnalyzeTableRanking = {
  rank: number;
  inbound: string;
  outbound: string;
};

export type TAnalyzeDetailSummary = {
  inboundSum: number; // 총 구매금액
  saleRate: number; // 판매율
  salesProfit: number; // 매출이익;
  anotherSaleRate: number; // 타매장 평균 매입대비 판매율
  anotherSalesProfit: number; // 타매장 대비 매출이익
  stockSum: number; // 잔여재고 금액
};

export type TAnalyzeDetailGradeResult = {
  comment: string;
  grade: string;
  totalScore: number;
};

export type TAnalyzeDetail = TAnalyzeDetailSummary & {
  storeName: string; // 매장명
  month: number; // 월
  errMsg?: Partial<Record<keyof TAnalyzeDetailSummary, string>>;
  ageRanking: TAnalyzeRanking;
  genderRanking: TAnalyzeRanking;
  brandRanking: TAnalyzeRanking;
  slipList: TSlip[]; // 전표 리스트
};

export type TAnalyzeDetailSummaryConfig = {
  label: string;
  key: keyof TAnalyzeDetailSummary;
  format?: TFormValue;
};

export type TAnalyzeDetailReturn = {
  storeName: string; // 매장명
  month: number; // 월

  summary: TAnalyzeDetailSummary;
  gradeResult: TAnalyzeDetailGradeResult;
  ageRanking: TAnalyzeTableRanking[];
  genderRanking: TAnalyzeTableRanking[];
  brandRanking: TAnalyzeTableRanking[];
  slipList: TSlip[]; // 전표 리스트
};

export type TSlip = {
  slipNo: string;
  count: number;
  supplierSum: number;
  vatSum: number;
  totalSum: number;
};

export type TAnalyzeSalesConfig = {
  label: string;
  key: keyof TAnalyzeGradeSales;
  format: TFormValue;
};

export type TAnalyzeSalesGradeRequest = {
  slipNoList: string[];
  storeName: string;
};

export type TAnalyzeGradeSales = {
  inboundQty: number;
  inboundAmount: number;
  outboundQty: number;
  outboundAmount: number;
  consumptionRate: number;
  salesProfit: number;
  profitRate: number;
};

export type TAnalyzeGradeProfit = {
  remainingQty: number;
  remainingCost: number;
  totalSalesProfit: number;
  totalProfitRate: number;
  costRecoveryRate: number;
};

export type TAnalyzeSalesGrade = TAnalyzeGradeProfit &
  TAnalyzeGradeSales & { gradeResult: TAnalyzeDetailGradeResult };

export type TAnalyzeSalesGradeReturn = {
  salesOverview: TAnalyzeGradeSales;
  profitAnalysis: TAnalyzeGradeProfit;
  gradeResult: TAnalyzeDetailGradeResult;
};
