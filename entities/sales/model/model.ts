import { queries } from '@/shared/queries';
import { QueryOpts } from '@/shared/types/http';
import {
  TSalesBreakDownQuery,
  TSalesBreakDownResponse,
} from '@/shared/types/sales';
import { useQuery } from '@tanstack/react-query';
import { salesQueries } from './queries';

type SalesKey = ReturnType<typeof queries.sales.getSales>['queryKey'];

// 훅을 제네릭으로 만들어 select 함수의 반환 타입을 자동으로 추론하도록 합니다.
export const useGetSales = <TData = TSalesBreakDownResponse[]>(
  params: TSalesBreakDownQuery,
  options?: QueryOpts<TSalesBreakDownResponse[], TData, SalesKey>, // 원본리턴타입, select 리턴타입, queryKey타입
) => {
  const { queryKey, queryFn } = salesQueries.breakdown(params);
  return useQuery<TSalesBreakDownResponse[], Error, TData, SalesKey>({
    queryKey,
    queryFn,
    ...options,
  });
};
