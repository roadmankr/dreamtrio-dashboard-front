import React from 'react';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='mx-auto flex min-h-full w-full flex-col space-y-6 p-6'>
      {children}
    </div>
  );
};

export default PageWrapper;
