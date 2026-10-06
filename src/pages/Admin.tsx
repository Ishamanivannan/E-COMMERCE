import { useState } from "react";
import { Plus, Pencil, Trash2, X, Package, ClipboardList } from "lucide-react";
import { SAMPLE_PRODUCTS } from "../data";
import type { Product, Order } from "../types";

export default function Admin() {
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [orders] = useState<Order[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });

  const openAddForm = () => {
    setEditingId(null);
    setFormData({ name: "", category: "", price: "", description: "", image: "" });
    setShowForm(true);
  };

  const openEditForm = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      price: String(product.price),
      description: product.description,
      image: product.image,
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      // Edit existing product
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? {
                ...p,
                name: formData.name,
                category: formData.category,
                price: parseFloat(formData.price),
                description: formData.description,
                image: formData.image,
              }
            : p
        )
      );
    } else {
      // Add new product
      const newProduct: Product = {
        id: Math.max(0, ...products.map((p) => p.id)) + 1,
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        description: formData.description,
        image: formData.image,
      };
      setProducts((prev) => [newProduct, ...prev]);
    }
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="container">
      <h2 className="section-title">Admin Dashboard</h2>
      <button className="btn btn-primary" onClick={openAddForm}>
        <Plus size={18} /> Add New Product
      </button>

      {/* Products Table */}
      <div className="admin-section">
        <h3>
          <Package size={20} /> Products ({products.length})
        </h3>
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>#{product.id}</td>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="admin-thumb"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>Rs. {product.price.toFixed(2)}</td>
                  <td className="action-buttons">
                    <button
                      className="btn btn-edit"
                      onClick={() => openEditForm(product)}
                    >
                      <Pencil size={14} /> Edit
                    </button>
                    <button
                      className="btn btn-remove"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Orders Table */}
      <div className="admin-section">
        <h3>
          <ClipboardList size={20} /> Orders ({orders.length})
        </h3>
        {orders.length === 0 ? (
          <p className="empty">No orders yet.</p>
        ) : (
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Total</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customer_name}</td>
                    <td>{order.email}</td>
                    <td>{order.address}</td>
                    <td>Rs. {order.total.toFixed(2)}</td>
                    <td>{order.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingId !== null ? "Edit Product" : "Add New Product"}</h3>
              <button className="modal-close" onClick={() => setShowForm(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
              <label>Product Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <label>Category</label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />

              <label>Price (Rs.)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />

              <label>Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />

              <label>Image URL</label>
              <input
                type="text"
                required
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingId !== null ? "Update Product" : "Add Product"}
                </button>
                <button
                  type="button"
                  className="btn btn-cancel"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
