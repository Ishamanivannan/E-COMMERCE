// Shared types used across the app

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Order {
  id: number;
  customer_name: string;
  email: string;
  address: string;
  total: number;
  created_at: string;
}
