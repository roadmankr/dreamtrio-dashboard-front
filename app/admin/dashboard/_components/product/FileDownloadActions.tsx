import DashboardCard from '@/app/admin/dashboard/_components/common/DashboardCard';
import ExcelDownload from '@/components/ui/button/excel-download';

const FileDownloadActions = () => {
  return (
    <DashboardCard
      title={'상품 파일 다운로드'}
      className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4'
    >
      <ExcelDownload
        title='품절상품 다운로드'
        onClick={() => console.log('123')}
      />
      <ExcelDownload title='적정재고 부족 상품 다운로드' />
      <ExcelDownload title='미판매 상품 다운로드' />
    </DashboardCard>
  );
};

export default FileDownloadActions;
