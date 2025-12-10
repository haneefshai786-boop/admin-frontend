import { useEffect, useState } from "react";

export default function EditProduct({ product, onClose, onUpdate }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [vendor, setVendor] = useState(product.vendor?._id || "");
  const [category, setCategory] = useState(product.category?._id || "");
  const [subcategory, setSubcategory] = useState(product.subcategory?._id || "");
  const [description, setDescription] = useState(product.description || "");

  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    loadVendors();
    loadCategories();
  }, []);

  useEffect(() => {
    if (category) loadSubcategories(category);
  }, [category]);

  const loadVendors = async () => {
    const res = await fetch("http://localhost:5000/api/vendors");
    const data = await res.json();
    setVendors(data);
  };

  const loadCategories = async () => {
    const res = await fetch("http://localhost:5000/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  const loadSubcategories = async (catId) => {
    const res = await fetch(`http://localhost:5000/api/subcategories/category/${catId}`);
    const data = await res.json();
    setSubcategories(data);
  };

  const handleSubmit = async () => {
    const res = await fetch(`http://localhost:5000/api/products/${product._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price,
        vendor,
        category,
        subcategory,
        description
      }),
    });

    const data = await res.json();
    onUpdate();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white p-6 w-[450px] max-h-[90vh] overflow-y-scroll rounded shadow-lg">

        <h2 className="text-xl font-bold mb-4">Edit Product</h2>

        <label className="block mb-2">Name</label>
        <input
          className="w-full border p-2 mb-4 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block mb-2">Price</label>
        <input
          className="w-full border p-2 mb-4 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label className="block mb-2">Vendor</label>
        <select
          className="w-full border p-2 mb-4 rounded"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
        >
          <option value="">Select Vendor</option>
          {vendors.map((v) => (
            <option key={v._id} value={v._id}>{v.name}</option>
          ))}
        </select>

        <label className="block mb-2">Category</label>
        <select
          className="w-full border p-2 mb-4 rounded"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSubcategory(""); // reset
          }}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        <label className="block mb-2">Subcategory</label>
        <select
          className="w-full border p-2 mb-4 rounded"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
        >
          <option value="">Select Subcategory</option>
          {subcategories.map((s) => (
            <option key={s._id} value={s._id}>{s.name}</option>
          ))}
        </select>

        <label className="block mb-2">Description</label>
        <textarea
          className="w-full border p-2 mb-4 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded mt-3"
          onClick={handleSubmit}
        >
          Update
        </button>

        <button
          className="w-full bg-gray-300 text-black py-2 rounded mt-3"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
