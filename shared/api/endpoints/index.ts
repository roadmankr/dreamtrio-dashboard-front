//서버액션용 endpoints

import { analytics } from '@/shared/api/endpoints/analytics';
import { product } from './product';
import { sales } from './sales';
import { store } from './store';
import { upload } from './upload';

export const apis = { upload, store, sales, product, analytics };
