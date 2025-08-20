import { Chart, TChartMap } from '@/shared/types/sales';

export const chartDataConfig: TChartMap = {
  [Chart.PIE]: (data) =>
    data?.map((d) => ({ name: d.key, value: d.totalPrice })) ?? [],
  [Chart.BAR]: (data) =>
    data?.map((d) => ({
      name: d.key,
      uv: d.totalPrice,
      pv: d.count,
      amt: d.count,
    })) ?? [],
};

export const pichartCololrsConfig = [
  '#1F77B4', // 선명 블루 (매우 강조)
  '#FF7F0E', // 비비드 오렌지
  '#D62728', // 강렬 레드
  '#2CA02C', // 선명 그린
  '#9467BD', // 보라
  '#8C564B', // 브라운
  '#E377C2', // 핑크
  '#17BECF', // 청록/시안
  '#BCBD22', // 올리브 그린
  '#7F7F7F', // 뉴트럴 그레이
  '#AEC7E8', // 파스텔 블루
  '#FFBB78', // 파스텔 오렌지
  '#98DF8A', // 파스텔 그린
  '#C5B0D5', // 파스텔 퍼플
  '#C49C94', // 파스텔 브라운
] as const;
