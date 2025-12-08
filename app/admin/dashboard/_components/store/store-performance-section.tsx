'use client';

import AvgTicketDiscountCard from '@/app/admin/dashboard/_components/store/AvgTicketDiscountCard';
import PeerComparisonCard from '@/app/admin/dashboard/_components/store/PeerComparisonCard';
import SalesProfitCard from '@/app/admin/dashboard/_components/store/SalesProfitCard';
import StoreRankSummary from '@/app/admin/dashboard/_components/store/StoreRankSummary';
import YoYGrowthCard from '@/app/admin/dashboard/_components/store/YoYGrowthCard';

const StorePerformanceSection = () => {
  return (
    <div className='grid grid-cols-1 gap-4 md:gap-6'>
      <StoreRankSummary />

      {/* <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6'> */}
      <div className='grid grid-cols-1 gap-4'>
        <SalesProfitCard />
        <YoYGrowthCard />
      </div>

      {/* <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6'> */}
      <div className='grid grid-cols-1 gap-4'>
        <AvgTicketDiscountCard />
        <PeerComparisonCard />
      </div>
    </div>
  );
};

export default StorePerformanceSection;
