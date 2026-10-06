# EasyShop - E-Commerce Web Application

A complete e-commerce project with two versions:

1. **Flask + SQLite backend** (for college submission / viva)
2. **React + Vite frontend** (live interactive website)

---

## Project Structure

```
EasyShop/
├── app.py                  # Main Flask application (all routes)
├── database.py             # SQLite database setup + 10 sample products
├── requirements.txt        # Python dependencies (Flask)
├── ecommerce.db            # SQLite database (auto-created on first run)
│
├── templates/              # Flask HTML templates (Jinja2)
│   ├── base.html
│   ├── home.html
│   ├── shop.html
│   ├── product.html
│   ├── checkout.html
│   ├── order_success.html
│   ├── admin.html
│   └── admin_form.html
│
├── static/                 # Flask static assets
│   ├── style.css
│   └── script.js
│
├── index.html              # Vite entry point (React frontend)
├── package.json            # Node.js dependencies
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
│
└── src/                    # React frontend source
    ├── main.tsx
    ├── App.tsx
    ├── types.ts
    ├── data.ts
    ├── CartContext.tsx
    ├── index.css
    ├── components/
    │   ├── Navbar.tsx
    │   ├── Footer.tsx
    │   └── ProductCard.tsx
    └── pages/
        ├── Home.tsx
        ├── Shop.tsx
        ├── ProductDetail.tsx
        ├── Cart.tsx
        ├── Checkout.tsx
        └── Admin.tsx
```

---

## Version 1: Flask + SQLite (Backend)

### Requirements
- Python 3.8+
- Flask

### How to Run

```bash
pip install -r requirements.txt
python app.py
```

Open your browser at `http://127.0.0.1:5000`

### Database
- Uses Python's built-in `sqlite3` module
- 3 tables: `products`, `orders`, `order_items`
- 10 sample products added automatically on first run
- Database file `ecommerce.db` is created automatically

### Features
- Home page with featured products
- Product listing with search and category filter
- Product details page with quantity selector
- Add to Cart / Remove from Cart / Quantity control
- Cart stored in browser localStorage
- Checkout form that saves orders to SQLite
- Order confirmation page
- Admin dashboard to add, edit, delete products
- View all orders in admin page

---

## Version 2: React + Vite (Frontend Website)

### Requirements
- Node.js 18+
- npm

### How to Run

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder.

---

## Tech Stack

| Part    | Technology              |
|---------|-------------------------|
| Backend | Python Flask, SQLite    |
| Frontend| React, TypeScript, Vite |
| Styling | CSS (custom)            |
| Icons   | lucide-react            |
| Routing | react-router-dom        |

---

## Database Tables

### products
| Column       | Type    |
|--------------|---------|
| id           | INTEGER |
| name         | TEXT    |
| category     | TEXT    |
| price        | REAL    |
| description  | TEXT    |
| image        | TEXT    |

### orders
| Column         | Type    |
|----------------|---------|
| id             | INTEGER |
| customer_name  | TEXT    |
| email          | TEXT    |
| address        | TEXT    |
| total          | REAL    |
| created_at     | TEXT    |

### order_items
| Column        | Type    |
|---------------|---------|
| id            | INTEGER |
| order_id      | INTEGER |
| product_id    | INTEGER |
| product_name  | TEXT    |
| price         | REAL    |
| quantity      | INTEGER |
