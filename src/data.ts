import type { Product } from "./types";

// The same 10 sample products used in the Flask/SQLite version.
// This keeps the website self-contained for demo purposes.
export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 1999.0,
    description:
      "High quality wireless headphones with noise cancellation and 20 hour battery life.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
  },
  {
    id: 2,
    name: "Smart Phone",
    category: "Electronics",
    price: 12999.0,
    description:
      "Latest smartphone with 6.5 inch display, triple camera and 128GB storage.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
  },
  {
    id: 3,
    name: "Laptop",
    category: "Electronics",
    price: 45999.0,
    description:
      "Powerful laptop with 16GB RAM, 512GB SSD and a fast processor for work and gaming.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b39a851?w=500",
  },
  {
    id: 4,
    name: "Smart Watch",
    category: "Electronics",
    price: 3499.0,
    description:
      "Stylish smart watch with fitness tracking, heart rate monitor and water resistance.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
  },
  {
    id: 5,
    name: "Cotton T-Shirt",
    category: "Clothing",
    price: 499.0,
    description:
      "Comfortable 100% cotton t-shirt available in multiple colors and sizes.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
  },
  {
    id: 6,
    name: "Denim Jeans",
    category: "Clothing",
    price: 1299.0,
    description:
      "Classic blue denim jeans with a perfect fit and durable fabric.",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
  },
  {
    id: 7,
    name: "Running Shoes",
    category: "Footwear",
    price: 2499.0,
    description:
      "Lightweight running shoes with cushioned soles for maximum comfort.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
  },
  {
    id: 8,
    name: "Backpack",
    category: "Accessories",
    price: 999.0,
    description:
      "Spacious backpack with multiple compartments and a laptop sleeve.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
  },
  {
    id: 9,
    name: "Coffee Mug",
    category: "Home",
    price: 249.0,
    description:
      "Ceramic coffee mug with a smooth finish, perfect for your morning coffee.",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500",
  },
  {
    id: 10,
    name: "Table Lamp",
    category: "Home",
    price: 899.0,
    description:
      "Modern table lamp with adjustable brightness and a warm white LED bulb.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
  },
];
