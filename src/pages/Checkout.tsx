import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { useCart } from "../CartContext";
import type { Order } from "../types";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const [form, setForm] = useState({
    customer_name: "",
    email: "",
    address: "",
  });
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // If cart is empty and no order placed, show message
  if (cart.length === 0 && !placedOrder) {
    return (
      <div className="container">
        <h2 className="section-title">Checkout</h2>
        <div className="empty-cart">
          <p>Your cart is empty. Go to the shop to add products.</p>
          <Link
            to="/shop"
            className="btn btn-primary"
            style={{ marginTop: 16 }}
          >
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  // Show success page after order is placed
  if (placedOrder) {
    return (
      <div className="container">
        <div className="success-box">
          <CheckCircle size={64} className="success-icon" />
          <h1>Order Placed Successfully!</h1>
          <p>
            Thank you, <strong>{placedOrder.customer_name}</strong>. Your order
            has been received.
          </p>
          <p>
            Order ID: <strong>#{placedOrder.id}</strong>
          </p>
          <p>
            Total Amount: <strong>Rs. {placedOrder.total.toFixed(2)}</strong>
          </p>
          <Link to="/shop" className="btn btn-primary" style={{ marginTop: 24 }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving the order (in the Flask version this goes to SQLite)
    const order: Order = {
      id: Math.floor(Math.random() * 10000) + 1,
      customer_name: form.customer_name,
      email: form.email,
      address: form.address,
      total: cartTotal,
      created_at: new Date().toLocaleString(),
    };
    setPlacedOrder(order);
    clearCart();
  };

  return (
    <div className="container">
      <Link to="/cart" className="back-link">
        <ArrowLeft size={16} /> Back to Cart
      </Link>
      <h2 className="section-title">Checkout</h2>
      <div className="checkout-layout">
        {/* Cart Review */}
        <div className="checkout-review">
          <h3>Order Items</h3>
          <div className="checkout-items">
            {cart.map((item) => (
              <div key={item.id} className="checkout-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-thumb"
                />
                <div className="checkout-item-info">
                  <p className="checkout-item-name">{item.name}</p>
                  <p className="checkout-item-meta">
                    {item.quantity} x Rs. {item.price.toFixed(2)}
                  </p>
                </div>
                <p className="checkout-item-subtotal">
                  Rs. {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="checkout-total-row">
            <span>Total</span>
            <span>Rs. {cartTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>Customer Details</h3>

          <label>Full Name</label>
          <input
            type="text"
            required
            placeholder="Enter your name"
            value={form.customer_name}
            onChange={(e) =>
              setForm({ ...form, customer_name: e.target.value })
            }
          />

          <label>Email</label>
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <label>Delivery Address</label>
          <textarea
            required
            placeholder="Enter your delivery address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          <div className="checkout-total-box">
            <h3>
              Total: Rs. {cartTotal.toFixed(2)}
            </h3>
          </div>

          <button type="submit" className="btn btn-primary">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}
