import { queries } from '@/shared/queries';
import { useQuery } from '@tanstack/react-query';
import { getStoreList } from '../../api';

const useGetStoreList = () => {
  return useQuery({
    queryKey: queries.store.getStoreList.queryKey,
    queryFn: getStoreList,
  });
};

export default useGetStoreList;
