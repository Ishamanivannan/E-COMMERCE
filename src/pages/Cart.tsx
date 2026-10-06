import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container">
        <h2 className="section-title">Your Cart</h2>
        <div className="empty-cart">
          <ShoppingBag size={64} className="empty-cart-icon" />
          <p>Your cart is empty.</p>
          <Link to="/shop" className="btn btn-primary" style={{ marginTop: 16 }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="section-title">Your Cart</h2>
      <div className="cart-layout">
        {/* Cart Items Table */}
        <div className="cart-items">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={item.id}>
                  <td className="cart-product-cell">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-thumb"
                    />
                    <span>{item.name}</span>
                  </td>
                  <td>Rs. {item.price.toFixed(2)}</td>
                  <td>
                    <div className="cart-qty">
                      <button
                        onClick={() =>
                          updateQuantity(index, item.quantity - 1)
                        }
                        className="qty-btn-sm"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(index, item.quantity + 1)
                        }
                        className="qty-btn-sm"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>Rs. {(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="btn-icon-remove"
                      title="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cart Summary */}
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Items</span>
            <span>
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <div className="summary-row">
            <span>Total</span>
            <span className="summary-total">
              Rs. {cartTotal.toFixed(2)}
            </span>
          </div>
          <Link to="/checkout" className="btn btn-primary checkout-btn">
            Proceed to Checkout <ArrowRight size={18} />
          </Link>
          <Link to="/shop" className="btn btn-cancel" style={{ marginTop: 8 }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
