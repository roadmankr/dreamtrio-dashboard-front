import React from 'react';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='mx-auto flex min-h-full w-full flex-col space-y-6 px-2 py-4'>
      {children}
    </div>
  );
};

export default PageWrapper;
