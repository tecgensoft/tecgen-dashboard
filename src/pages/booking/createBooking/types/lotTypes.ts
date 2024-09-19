/* eslint-disable @typescript-eslint/no-explicit-any */
export type Product = {
  id: number;
  Product?: string;
  customs?: number;
  [key: string]: any;
};

export type Lot = {
  id: number;
  open: boolean;
  products: Product[];
  lotNumber: number;
  [key: string]: any;
};
