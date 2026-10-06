# database.py
# This file handles the SQLite database.
# It creates 3 tables: products, orders, order_items
# It also adds 10 sample products automatically.

import sqlite3

DB_NAME = "ecommerce.db"  # name of the database file


def get_connection():
    """Create and return a connection to the SQLite database."""
    # check_same_thread=False allows Flask to use the same connection in different threads
    conn = sqlite3.connect(DB_NAME, check_same_thread=False)
    conn.row_factory = sqlite3.Row  # This lets us access columns by name like a dictionary
    return conn


def init_db():
    """Create the 3 tables if they do not exist, then add 10 sample products."""

    conn = get_connection()
    cur = conn.cursor()

    # TABLE 1: products
    # Stores all the products that the shop sells
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            price REAL NOT NULL,
            description TEXT NOT NULL,
            image TEXT NOT NULL
        )
        """
    )

    # TABLE 2: orders
    # Stores one row per order placed by a customer
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_name TEXT NOT NULL,
            email TEXT NOT NULL,
            address TEXT NOT NULL,
            total REAL NOT NULL,
            created_at TEXT NOT NULL
        )
        """
    )

    # TABLE 3: order_items
    # Stores each product that belongs to an order (one order can have many items)
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS order_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            product_name TEXT NOT NULL,
            price REAL NOT NULL,
            quantity INTEGER NOT NULL,
            FOREIGN KEY (order_id) REFERENCES orders (id)
        )
        """
    )

    conn.commit()

    # Check if products table is empty. If empty, add 10 sample products.
    cur.execute("SELECT COUNT(*) FROM products")
    count = cur.fetchone()[0]

    if count == 0:
        # 10 sample products. Images use Unsplash source URLs so they load in the browser.
        sample_products = [
            ("Wireless Headphones", "Electronics", 1999.00,
             "High quality wireless headphones with noise cancellation and 20 hour battery life.",
             "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"),
            ("Smart Phone", "Electronics", 12999.00,
             "Latest smartphone with 6.5 inch display, triple camera and 128GB storage.",
             "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"),
            ("Laptop", "Electronics", 45999.00,
             "Powerful laptop with 16GB RAM, 512GB SSD and a fast processor for work and gaming.",
             "https://images.unsplash.com/photo-1496181133206-80ce9b39a851?w=500"),
            ("Smart Watch", "Electronics", 3499.00,
             "Stylish smart watch with fitness tracking, heart rate monitor and water resistance.",
             "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"),
            ("Cotton T-Shirt", "Clothing", 499.00,
             "Comfortable 100% cotton t-shirt available in multiple colors and sizes.",
             "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"),
            ("Denim Jeans", "Clothing", 1299.00,
             "Classic blue denim jeans with a perfect fit and durable fabric.",
             "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"),
            ("Running Shoes", "Footwear", 2499.00,
             "Lightweight running shoes with cushioned soles for maximum comfort.",
             "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"),
            ("Backpack", "Accessories", 999.00,
             "Spacious backpack with multiple compartments and a laptop sleeve.",
             "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"),
            ("Coffee Mug", "Home", 249.00,
             "Ceramic coffee mug with a smooth finish, perfect for your morning coffee.",
             "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500"),
            ("Table Lamp", "Home", 899.00,
             "Modern table lamp with adjustable brightness and a warm white LED bulb.",
             "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500"),
        ]

        # Insert all 10 sample products
        cur.executemany(
            "INSERT INTO products (name, category, price, description, image) VALUES (?, ?, ?, ?, ?)",
            sample_products,
        )
        conn.commit()
        print("10 sample products added to the database.")

    conn.close()


if __name__ == "__main__":
    # If we run this file directly, it will create the database and tables
    init_db()
    print("Database created successfully!")
