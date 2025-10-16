'use client';

import QueryProvider from '@/shared/providers/query-provider';
import ToastContainer from '@/shared/providers/toast-container';

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <ToastContainer />
      {children}
    </QueryProvider>
  );
};

export default AppProvider;
