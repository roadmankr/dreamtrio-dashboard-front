export const product = {
  getProductByBarcode: (barcode: string, storeId: number) =>
    [
      `store/product`,
      { method: 'get', searchParams: { barcode, storeId } },
    ] as const,
};
