import { upload } from '../api/endpoints/upload';
import { product } from './product';
import { sales } from './sales';
import { store } from './store';

export * from './store';
export * from './upload.queries';

export const queries = { store, upload, sales, product };
