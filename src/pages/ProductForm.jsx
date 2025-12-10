import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    vendor: "",
    category: "",
    subcategory: "",
    stock: "",
  });

  // Load vendors, categories, and existing product if edit mode
  useEffect(() => {
    fetchVendors();
    fetchCategories();
    if (isEdit) fetchProduct();
  }, []);

  // Load subcategories when category changes
  useEffect(() => {
    if (form.category) fetchSubcategories(form.category);
  }, [form.category]);

  // Fetch vendors
  const fetchVendors = async () => {
    const res = await fetch("http://localhost:5000/api/vendors");
    const data = await res.json();
    setVendors(data);
  };

  // Fetch categories
  const fetchCategories = async () => {
    const res = await fetch("http://localhost:5000/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  // Fetch subcategories based on category
  const fetchSubcategories = async (catId) => {
    const res = await fetch(`http://localhost:5000/api/subcategories/category/${catId}`);
    const data = await res.json();
    setSubcategories(data);
  };

  // Fetch existing product (edit mode)
  const fetchProduct = async () => {
    const res = await fetch(`http://localhost:5000/api/products/${id}`);
    const data = await res.json();

    setForm({
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
      vendor: data.vendor?._id,
      category: data.category?._id,
      subcategory: data.subcategory?._id,
      stock: data.stock,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");

    const method = isEdit ? "PUT" : "POST";
    const url = isEdit
      ? `http://localhost:5000/api/products/${id}`
      : "http://localhost:5000/api/products";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Product saved successfully");
      navigate("/admin/products");
    } else {
      alert("Error saving product");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        {isEdit ? "Edit Product" : "Add Product"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Product Name */}
        <input
          type="text"
          placeholder="Product Name"
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        ></textarea>

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          className="w-full border p-2 rounded"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        {/* Image URL */}
        <input
          type="text"
          placeholder="Image URL"
          className="w-full border p-2 rounded"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        {/* Vendor Dropdown */}
        <select
          className="w-full border p-2 rounded"
          value={form.vendor}
          onChange={(e) => setForm({ ...form, vendor: e.target.value })}
          required
        >
          <option value="">Select Vendor</option>
          {vendors.map((v) => (
            <option key={v._id} value={v._id}>
              {v.name}
            </option>
          ))}
        </select>

        {/* Category Dropdown */}
        <select
          className="w-full border p-2 rounded"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Subcategory Dropdown */}
        <select
          className="w-full border p-2 rounded"
          value={form.subcategory}
          onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
          required
        >
          <option value="">Select Subcategory</option>
          {subcategories.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>

        {/* Stock */}
        <input
          type="number"
          placeholder="Stock"
          className="w-full border p-2 rounded"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {isEdit ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
