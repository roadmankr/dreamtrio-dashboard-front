import dayjs from '@/lib/dayjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  purchaseAnalyticsFilterSchema,
  TPurchaseAnalyticsInputFilter,
} from './../_schema/filter.schema';

const usePurchaseAnalyticsFilter = () => {
  const form = useForm<TPurchaseAnalyticsInputFilter>({
    mode: 'onChange',
    resolver: zodResolver(purchaseAnalyticsFilterSchema),
    defaultValues: {
      storeId: undefined,
      range: {
        to: dayjs(),
        from: dayjs().startOf('month').toDate(),
      },
    },
  });

  const onSubmit = async (data: TPurchaseAnalyticsInputFilter) => {
    console.log(data);
  };

  return { form, onSubmit };
};

export default usePurchaseAnalyticsFilter;
