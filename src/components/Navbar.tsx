import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../CartContext";

export default function Navbar() {
  const { cartCount } = useCart();
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/shop", label: "Shop" },
    { path: "/admin", label: "Admin" },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          EasyShop
        </Link>
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? "nav-active" : ""}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/cart" className="cart-link">
              <ShoppingCart size={18} />
              <span className="cart-count">{cartCount}</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
