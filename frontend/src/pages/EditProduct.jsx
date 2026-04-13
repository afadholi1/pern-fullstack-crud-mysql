import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Mengambil ID dari URL

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setName(response.data.name);
        setCategory(response.data.category);
        setPrice(response.data.price.toString());
        setStock(response.data.stock.toString());
      } catch (error) {
        console.log(error);
      }
    };
    getProductById();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/products/${id}`, {
        name,
        category,
        price: parseInt(price),
        stock: parseInt(stock),
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const formatRupiah = (value) => {
    if (!value) return "";
    const number = value.toString().replace(/\D/g, "");
    return new Intl.NumberFormat("id-ID").format(number);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Produk</h1>
      <form onSubmit={updateProduct} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Nama Produk</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Kategori</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">Harga</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formatRupiah(price)}
              onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))}
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Stok</label>
            <input
              type="number"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex gap-3">
            <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition mt-4"
            >
            Update Produk
            </button>
            <button
            type="button"
            onClick={() => navigate("/")}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition mt-4"
            >
            Batal
            </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;