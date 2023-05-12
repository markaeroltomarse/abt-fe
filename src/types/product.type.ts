export interface IProductType {
  id: string;
  name: string;
  createdAt: string;
  updatedAt?: string;
}

export interface IProductItemType {
  id: string;
  name: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ItemEntity {
  id: string;
  productId: string;
  quantity: number;
  kilo: number;
  customer: string | null;
  from: 'IN' | 'OUT';
  dateArrived: string;
  recieptNumber: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface IProduct {
  id: string;
  name: string;
  data: {
    totalQuantity: number;
    totalKilo: number;
  };
  items: ItemEntity[];
  totalSize: number;
}
