'use client';

import FileDownloadActions from '@/app/admin/dashboard/_components/product/FileDownloadActions';
import SellerTables from '@/app/admin/dashboard/_components/product/SellerTables';
import Top20ChartsCard from '@/app/admin/dashboard/_components/product/Top20ChartsCard';

const ProductPerformanceSection = () => {
  return (
    <div className='flex flex-col gap-4'>
      <Top20ChartsCard />
      <FileDownloadActions />
      <SellerTables />
    </div>
  );
};

export default ProductPerformanceSection;
