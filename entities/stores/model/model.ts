import { useQuery } from '@tanstack/react-query';
import { storeQueries } from './queries';

// 매장 리스트
export const useGetStoreList = () => useQuery(storeQueries.list);

// 매장 디테일
export const useGetStoreDetail = (storeId: number) =>
  useQuery(storeQueries.detail(storeId));
