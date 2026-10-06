import { Link } from "react-router-dom";
import type { Product } from "../types";
import { useCart } from "../CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
          loading="lazy"
        />
      </Link>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="price">Rs. {product.price.toFixed(2)}</p>
        <button className="btn btn-add" onClick={handleAdd}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
