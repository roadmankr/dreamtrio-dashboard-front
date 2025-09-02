export type TProduct = {
  productName: string;
  quantity: number;
  barcode: string;
  typeGender: string;
  typeAge: string;
  typeBrand: string;
  optimalStock: number;
  stockRate: number;
  saleRate: number;
  new: boolean;
  price: number;
};

export type TProductCart = {
  qty: number;
  // unitPrice: number;
} & TProduct;
