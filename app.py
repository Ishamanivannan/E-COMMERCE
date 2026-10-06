# app.py
# This is the main Flask application file.
# It has all the routes for the EasyShop e-commerce website.

from flask import Flask, render_template, request, redirect, url_for, jsonify
from database import init_db, get_connection
from datetime import datetime

app = Flask(__name__)

# Create the database and tables before the app starts
init_db()


# =========================================================
# PUBLIC ROUTES (Home, Shop, Search, Product Details)
# =========================================================

@app.route("/")
def home():
    """Show the home page with a few featured products."""
    conn = get_connection()
    # Get the first 4 products to show as featured on the home page
    products = conn.execute("SELECT * FROM products LIMIT 4").fetchall()
    conn.close()
    return render_template("home.html", products=products)


@app.route("/shop")
def shop():
    """Show all products. Optional search by keyword and filter by category."""
    search = request.args.get("search", "")   # get the search keyword from the URL
    category = request.args.get("category", "")  # get the selected category from the URL

    conn = get_connection()

    # Build the query based on search and category filters
    if search:
        # Search by name or description (LIKE is a simple text match)
        products = conn.execute(
            "SELECT * FROM products WHERE name LIKE ? OR description LIKE ?",
            ("%" + search + "%", "%" + search + "%"),
        ).fetchall()
    elif category:
        # Filter by a specific category
        products = conn.execute(
            "SELECT * FROM products WHERE category = ?", (category,)
        ).fetchall()
    else:
        # No filters: show all products
        products = conn.execute("SELECT * FROM products").fetchall()

    # Get all unique categories for the sidebar filter
    categories = conn.execute(
        "SELECT DISTINCT category FROM products ORDER BY category"
    ).fetchall()
    conn.close()

    return render_template(
        "shop.html", products=products, categories=categories,
        search=search, category=category
    )


@app.route("/product/<int:product_id>")
def product_detail(product_id):
    """Show the full details of one product."""
    conn = get_connection()
    product = conn.execute(
        "SELECT * FROM products WHERE id = ?", (product_id,)
    ).fetchone()

    # Get 4 related products from the same category (excluding the current one)
    related = conn.execute(
        "SELECT * FROM products WHERE category = ? AND id != ? LIMIT 4",
        (product["category"], product_id),
    ).fetchall()
    conn.close()

    return render_template("product.html", product=product, related=related)


# =========================================================
# CART ROUTE (Cart is stored in the browser using JavaScript + localStorage)
# The checkout route receives the cart data and saves the order
# =========================================================

@app.route("/checkout", methods=["GET", "POST"])
def checkout():
    """Show the checkout form (GET) or save the order (POST)."""

    if request.method == "POST":
        # Get customer details from the form
        customer_name = request.form.get("customer_name")
        email = request.form.get("email")
        address = request.form.get("address")
        total = float(request.form.get("total", 0))

        # Get the cart items sent from the browser (as JSON string)
        cart_json = request.form.get("cart", "[]")

        import json
        cart = json.loads(cart_json)  # convert the JSON string back into a Python list

        # Save the order into the orders table
        conn = get_connection()
        cur = conn.cursor()

        created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        cur.execute(
            "INSERT INTO orders (customer_name, email, address, total, created_at) VALUES (?, ?, ?, ?, ?)",
            (customer_name, email, address, total, created_at),
        )
        order_id = cur.lastrowid  # get the id of the order we just created

        # Save each item in the cart into the order_items table
        for item in cart:
            cur.execute(
                "INSERT INTO order_items (order_id, product_id, product_name, price, quantity) VALUES (?, ?, ?, ?, ?)",
                (order_id, item["id"], item["name"], item["price"], item["quantity"]),
            )

        conn.commit()
        conn.close()

        # Show the order confirmation page
        return render_template(
            "order_success.html",
            order_id=order_id,
            customer_name=customer_name,
            total=total,
        )

    # GET request: show the empty checkout form
    return render_template("checkout.html")


# =========================================================
# ADMIN ROUTES (Add, Edit, Delete products)
# =========================================================

@app.route("/admin")
def admin():
    """Show the admin dashboard with all products and all orders."""
    conn = get_connection()
    products = conn.execute("SELECT * FROM products ORDER BY id DESC").fetchall()
    orders = conn.execute("SELECT * FROM orders ORDER BY id DESC").fetchall()
    conn.close()
    return render_template("admin.html", products=products, orders=orders)


@app.route("/admin/add", methods=["GET", "POST"])
def admin_add():
    """Add a new product. GET shows the form, POST saves the product."""
    if request.method == "POST":
        name = request.form.get("name")
        category = request.form.get("category")
        price = float(request.form.get("price"))
        description = request.form.get("description")
        image = request.form.get("image")

        conn = get_connection()
        conn.execute(
            "INSERT INTO products (name, category, price, description, image) VALUES (?, ?, ?, ?, ?)",
            (name, category, price, description, image),
        )
        conn.commit()
        conn.close()

        return redirect(url_for("admin"))

    # GET: show the add product form
    return render_template("admin_form.html", action="add", product=None)


@app.route("/admin/edit/<int:product_id>", methods=["GET", "POST"])
def admin_edit(product_id):
    """Edit an existing product. GET shows the form, POST updates the product."""
    conn = get_connection()

    if request.method == "POST":
        name = request.form.get("name")
        category = request.form.get("category")
        price = float(request.form.get("price"))
        description = request.form.get("description")
        image = request.form.get("image")

        conn.execute(
            "UPDATE products SET name=?, category=?, price=?, description=?, image=? WHERE id=?",
            (name, category, price, description, image, product_id),
        )
        conn.commit()
        conn.close()

        return redirect(url_for("admin"))

    # GET: show the edit form with the current product data
    product = conn.execute(
        "SELECT * FROM products WHERE id = ?", (product_id,)
    ).fetchone()
    conn.close()

    return render_template("admin_form.html", action="edit", product=product)


@app.route("/admin/delete/<int:product_id>")
def admin_delete(product_id):
    """Delete a product from the database."""
    conn = get_connection()
    conn.execute("DELETE FROM products WHERE id = ?", (product_id,))
    conn.commit()
    conn.close()

    return redirect(url_for("admin"))


# Start the Flask application
if __name__ == "__main__":
    app.run(debug=True, port=5000)
