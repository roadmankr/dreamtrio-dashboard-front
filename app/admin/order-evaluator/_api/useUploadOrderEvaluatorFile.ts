import { uploadOrderEvaluatorFileInServer } from '@/app/admin/order-evaluator/_actions';
import {
  getOptimalStockColor,
  getSaleRateColor,
  getStockRateColor,
} from '@/entities/commerce-analytics/lib/metrics';
import { showToastSuccess } from '@/lib/toast';
import { useMutation } from '@tanstack/react-query';
import { orderAnalyticsStore } from '../_store';

const useUploadOrderEvaluatorFile = () => {
  const setOrderAnalytics = orderAnalyticsStore(
    (state) => state.setOrderAnalytics,
  );

  return useMutation({
    mutationFn: uploadOrderEvaluatorFileInServer, // 서버액션 직접 호출용
    onSuccess: (data) => {
      showToastSuccess({ description: '파일 업로드에 성공하였습니다.' });
      const products = data.productInfo.map((d) => ({
        ...d,
        stockRateSignal: getStockRateColor(d.stockRate),
        saleRateSignal: getSaleRateColor(d.saleRate),
        optimalStockSignal: getOptimalStockColor({
          optimalStock: d.optimalStock,
          quantity: d.quantity,
        }),
      }));

      setOrderAnalytics(products);
    },
  });
};

export default useUploadOrderEvaluatorFile;
