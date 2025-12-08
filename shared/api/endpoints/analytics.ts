import { TAnalyzeSalesGradeRequest } from '@/shared/types/analyze';
import { EndpointBuilder } from '@/shared/types/api';

export const analytics = {
  // 구매분석에서 검색 시 route handler에서 백앤드와 통신할 앤드포인트
  getAnalyzeDetailInServer: ['sales/analyze', { method: 'GET' }] as const,

  // 구매분석에서 검색 시 route handler로 보낼 앤드포인트
  getAnalyzeDetailInClient: ['analytics/detail', { method: 'GET' }] as const,

  // 구매분석에서 왼쪽 아래 전표분석 리스트 체크 후 전표분석 눌렀을 때
  analytics: (reqeust: TAnalyzeSalesGradeRequest) =>
    [`sales/analyze/grade`, { method: 'POST', json: reqeust }] as const,
} as const satisfies Record<string, EndpointBuilder>;
