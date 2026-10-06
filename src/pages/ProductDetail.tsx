import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Minus, Plus, ShoppingCart, ArrowLeft } from "lucide-react";
import { SAMPLE_PRODUCTS } from "../data";
import { useCart } from "../CartContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const productId = Number(id);
  const product = SAMPLE_PRODUCTS.find((p) => p.id === productId);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container">
        <p className="empty">Product not found.</p>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: 16 }}>
          Back to Shop
        </Link>
      </div>
    );
  }

  const related = SAMPLE_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="container">
      <Link to="/shop" className="back-link">
        <ArrowLeft size={16} /> Back to Shop
      </Link>

      {/* Product Details */}
      <div className="product-detail">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="detail-info">
          <span className="product-category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="price-large">Rs. {product.price.toFixed(2)}</p>
          <p className="description">{product.description}</p>

          <div className="detail-actions">
            <div className="qty-selector">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="qty-btn"
              >
                <Minus size={16} />
              </button>
              <span className="qty-value">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="qty-btn"
              >
                <Plus size={16} />
              </button>
            </div>
            <button className="btn btn-primary" onClick={handleAddToCart}>
              <ShoppingCart size={18} /> Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <>
          <h2 className="section-title">Related Products</h2>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
