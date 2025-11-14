
export interface WarehouseData {
  id: number;
  name: string;
}

export interface AdminUser{
    id: number;
    name: string;
    password_hash: string;
}

export interface InventoryData{
    id: number;
    product_id: number;
    warehouse_id: number;
    quantity: number;
}

export interface ProductData{
    id: number;
    name: string;
    price: number;
    status: string;
}

export interface CustomerData{
    id: number;
    name: string;
    email: string;
}