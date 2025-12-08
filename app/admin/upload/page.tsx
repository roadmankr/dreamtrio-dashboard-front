import DashboardUploadForm from './_components/DashboardUploadForm.client';

const UploadPage = async () => {
  return (
    <div className='flex h-full w-full flex-1 flex-col items-center justify-center'>
      <DashboardUploadForm />
    </div>
  );
};

export default UploadPage;
