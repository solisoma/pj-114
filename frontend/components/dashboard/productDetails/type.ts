export interface productDetails {
  id?: number;
  name: string;
  desc: string;
  category: string;
  quantity?: number | string;
  price: number | string;
  isActive: boolean;
}

export interface subProductDetails {
  id: number;
  product?: { [key: string]: any };
  preview: string;
  details: string;
}
