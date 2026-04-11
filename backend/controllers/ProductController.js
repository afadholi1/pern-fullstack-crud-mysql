import db from "../config/database.js";

// 1. Get All Products
export const getProducts = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Get Product By ID
export const getProductById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Create Product
export const saveProduct = async (req, res) => {
  const { name, category, price, stock } = req.body;
  try {
    await db.query(
      "INSERT INTO products (name, category, price, stock) VALUES (?, ?, ?, ?)",
      [name, category, price, stock],
    );
    res.status(201).json({ message: "Product Created Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 4. Update Product
export const updateProduct = async (req, res) => {
  const { name, category, price, stock } = req.body;
  try {
    await db.query(
      "UPDATE products SET name = ?, category = ?, price = ?, stock = ? WHERE id = ?",
      [name, category, price, stock, req.params.id],
    );
    res.json({ message: "Product Updated Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 5. Delete Product
export const deleteProduct = async (req, res) => {
  try {
    await db.query("DELETE FROM products WHERE id = ?", [req.params.id]);
    res.json({ message: "Product Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
