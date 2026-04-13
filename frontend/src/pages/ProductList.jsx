import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const controller = new AbortController(); // Untuk membatalkan request jika komponen di-close

    const getProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products", {
                signal: controller.signal
            });
        setProducts(response.data);
      } catch (error) {
        if (axios.isCancel(error)) return; // Abaikan jika memang sengaja dibatalkan
         console.error("Error getProducts:", error);
      }
    };

    getProducts();
    return () => controller.abort(); // Bersihkan saat komponen tidak dipakai
  }, []);

  const deleteProduct = async (id) => {
    try {
        await axios.delete(`http://localhost:5000/products/${id}`);
        // Menggunakan functional update untuk keamanan data
        setProducts(prevProducts => prevProducts.filter((p) => p.id !== id));
    } catch (error) {
        console.log("Error saat menghapus:", error);
        alert("Gagal menghapus produk, silakan coba lagi.");
    }
};

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Daftar Produk</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-100 text-gray-600 uppercase text-sm">
              <th className="py-3 px-4">No</th>
              <th className="py-3 px-4">Nama Produk</th>
              <th className="py-3 px-4">Kategori</th>
              <th className="py-3 px-4">Harga</th>
              <th className="py-3 px-4">Stok</th>
              <th className="py-3 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((product, index) => (
              <tr key={product.id} className="hover:bg-gray-50 transition">
                <td className="py-4 px-4">{index + 1}</td>
                <td className="py-4 px-4 font-medium text-gray-700">
                  {product.name}
                </td>
                <td className="py-4 px-4 text-gray-600">{product.category}</td>
                <td className="py-4 px-4">
                  Rp {product.price.toLocaleString()}
                </td>
                <td className="py-4 px-4">{product.stock}</td>
                <td className="py-4 px-4 text-center space-x-2">
                  <Link
                    to={`/edit/${product.id}`}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
