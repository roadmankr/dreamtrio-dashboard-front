"use client";

import { getErrorMessage } from '@/lib/error';
import { showToastError } from '@/lib/toast';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React from 'react';
import { ErrorCode } from '../constants';

const errorHandler = async (error: unknown) => {
  const message = await getErrorMessage(error);
  console.log('error:', message);

  showToastError({
      title: 'Error',
      description: message || ErrorCode.UNKNOWN_ERROR,
    });
};

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30000,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        retryOnMount: false,
        retry: false,
      },
      mutations: {
        onError: (error: any, _) => {
          errorHandler(error);
        },
      },
    },
    queryCache: new QueryCache({
      onError: (error: any) => {
        errorHandler(error);
      },
    }),
});
  
const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default QueryProvider