import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SAMPLE_PRODUCTS } from "../data";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // Get all unique categories for the sidebar
  const categories = useMemo(() => {
    const cats = SAMPLE_PRODUCTS.map((p) => p.category);
    return [...new Set(cats)].sort();
  }, []);

  // Filter products by search keyword and category
  const filtered = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((p) => {
      const matchesSearch =
        search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "" || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="container">
      <h2 className="section-title">All Products</h2>
      <div className="shop-layout">
        {/* Sidebar: Search + Categories */}
        <aside className="sidebar">
          <div className="search-form">
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <h3>Categories</h3>
          <ul className="category-list">
            <li>
              <button
                className={category === "" ? "cat-active" : ""}
                onClick={() => setCategory("")}
              >
                All
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  className={category === cat ? "cat-active" : ""}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Product Grid */}
        <div className="product-content">
          {filtered.length === 0 ? (
            <p className="empty">No products found.</p>
          ) : (
            <div className="product-grid">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
