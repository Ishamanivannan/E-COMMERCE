import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SAMPLE_PRODUCTS } from "../data";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const featured = SAMPLE_PRODUCTS.slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to EasyShop</h1>
          <p>Your one stop shop for electronics, clothing, footwear and more.</p>
          <Link to="/shop" className="btn btn-primary hero-btn">
            Start Shopping <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container">
        <h2 className="section-title">Featured Products</h2>
        <div className="product-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
