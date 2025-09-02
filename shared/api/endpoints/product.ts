export const product = {
  getProductByBarcode: (barcode: string, storeId: number) =>
    [
      `store/product?barcode=${barcode}&storeId=${storeId}`,
      { method: 'get' },
    ] as const,
};
