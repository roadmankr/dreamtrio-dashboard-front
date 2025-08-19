import { queries } from '@/shared/queries';
import { useQuery } from '@tanstack/react-query';
import { getStoreList } from '../service';

const useStoreOptions = () => {
  return useQuery({
    queryKey: queries.store.getStoreList.queryKey,
    queryFn: getStoreList,
  });
};

export default useStoreOptions;
