import { TProduct, TProductCart } from '@/entities/product/model/type';
import { TSelectedStore } from '@/entities/stores/model/type';
import { create } from 'zustand';

interface SelectedStore {
  storeId: number;
  setStoreId: (storeId: number) => void;
  storeInfo: TSelectedStore;
  setStoreInfo: (props: TSelectedStore | null) => void;
  resetStore: () => void;
  setPending: (isPending: boolean) => void;
  isPending?: boolean;
}

export const intitialOptimal = {
  currentStockCost: 0,
  optimalStockCost: 0,
} as const;

const initialStoreInfo = {
  age: [],
  gender: [],
  brand: [],
  optimal: intitialOptimal,
  storeId: 0,
  storeName: '',
};

export const selectedStore = create<SelectedStore>((set) => ({
  storeId: 0,
  isPending: false,
  setPending: (isPending: boolean) => set((state) => ({ ...state, isPending })),
  setStoreId: (storeId) => set((state) => ({ ...state, storeId })),
  storeInfo: initialStoreInfo,
  setStoreInfo: (storeInfo) =>
    set((state) => ({
      ...state,
      storeInfo: storeInfo ?? initialStoreInfo,
    })),
  resetStore: () =>
    set((state) => ({
      ...state,
      storeId: 0,
      isPending: false,
      storeInfo: initialStoreInfo,
    })),
}));

interface SearchProduct {
  isPending: boolean;
  setPending: (isPending: boolean) => void;
  isNoResult: boolean | null;
  searchWord: string;
  searchProduct: TProduct | null;
  setSearchProduct: (product: TProduct | 'reset' | null) => void;
  searchProductList: TProduct[];
  setSearchWord: (word: string) => void;
  setSearchProductList: (product: TProduct | null) => void;
  resetSearchProductList: () => void;
  reset: () => void;
}
export const searchProductListStore = create<SearchProduct>((set, get) => ({
  searchProductList: [],
  isPending: false,
  setPending: (isPending) => set((state) => ({ ...state, isPending })),
  isNoResult: null,
  searchWord: '',
  searchProduct: null,
  setSearchProduct: (product) =>
    set((state) => ({
      ...state,
      searchProduct: product === 'reset' ? null : product,
      isNoResult: product === 'reset' ? null : !product,
    })),
  setSearchProductList: (product) => {
    if (!product) {
      set((state) => ({ ...state, isNoResult: true }));
      return;
    }
    const list = get().searchProductList;
    const index = list.findIndex((l) => l.barcode === product.barcode);
    const newList =
      index === -1
        ? [product, ...list]
        : [list[index], ...list.slice(0, index), ...list.slice(index + 1)];
    set((state) => ({
      ...state,
      searchProductList: newList,
      isNoResult: false,
    }));
  },
  setSearchWord: (word) => set((state) => ({ ...state, searchWord: word })),
  resetSearchProductList: () =>
    set((state) => ({ ...state, searchProductList: [] })),
  reset: () =>
    set((state) => ({
      ...state,
      isNoResult: null,
      searchProductList: [],
      searchWord: '',
      isPending: false,
    })),
}));

interface CartProduct {
  cartList: TProductCart[];
  setCartList: (product: TProduct) => void;
  removeCart: (barcode: string) => void;
  resetCartList: () => void;
  changeQty: (barcode: string, qty: number) => void;
}

export const cartProductListStore = create<CartProduct>((set, get) => ({
  cartList: [],
  setCartList: (product) => {
    if (!product) {
      set((state) => ({ ...state, isNoResult: true }));
      return;
    }
    const list = get().cartList;
    const index = list.findIndex((l) => l.barcode === product.barcode);
    const newList: TProductCart[] =
      index === -1
        ? [{ ...product, qty: 1 }, ...list]
        : [
            { ...list[index], qty: list[index].qty + 1 },
            ...list.slice(0, index),
            ...list.slice(index + 1),
          ];
    set((state) => ({
      ...state,
      cartList: newList,
    }));
  },
  changeQty: (barcode, qty) =>
    set((state) => ({
      ...state,
      cartList: state.cartList.map((cart) =>
        cart.barcode === barcode ? { ...cart, qty } : cart,
      ),
    })),
  resetCartList: () => set((state) => ({ ...state, cartList: [] })),
  removeCart: (barcode) => {
    set((state) => ({
      ...state,
      cartList: state.cartList.filter(
        (cart) => `${cart.barcode}` !== `${barcode}`,
      ),
    }));
  },
}));
