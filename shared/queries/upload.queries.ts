import { createQueryKeys } from '@lukemorales/query-key-factory';

export const upload = createQueryKeys('upload', {
  dashboardUpload : {
    queryKey: ['dashboard'],
  },
})