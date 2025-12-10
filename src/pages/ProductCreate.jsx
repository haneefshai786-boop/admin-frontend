// src/pages/ProductCreate.jsx
import { useEffect, useState } from "react";

/**
 * ProductCreate (fixed)
 * - native <select> elements
 * - ensures modal/backdrop do not block selects (z-index + pointer-events)
 * - logs fetch results to console for debugging
 */

export default function ProductCreate() {
  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    vendor: "",
    category: "",
    subcategory: "",
  });

  useEffect(() => {
    // Ensure body doesn't have pointer-events:none accidentally
    document.body.style.pointerEvents = document.body.style.pointerEvents || "auto";

    (async function loadAll() {
      try {
        const [vRes, cRes] = await Promise.all([
          fetch("/api/vendors"),
          fetch("/api/categories"),
        ]);
        const [vData, cData] = await Promise.all([vRes.json(), cRes.json()]);
        console.log("Vendors:", vData);
        console.log("Categories:", cData);
        setVendors(Array.isArray(vData) ? vData : []);
        setCategories(Array.isArray(cData) ? cData : []);
      } catch (err) {
        console.error("Failed to load vendors/categories:", err);
        setVendors([]);
        setCategories([]);
      }
    })();
  }, []);

  // load subcats when category changes
  useEffect(() => {
    if (!form.category) return setSubcategories([]);
    (async () => {
      try {
        const res = await fetch(`/api/subcategories/by-category/${form.category}`);
        const data = await res.json();
        console.log("Subcategories for category", form.category, data);
        setSubcategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load subcategories:", err);
        setSubcategories([]);
      }
    })();
  }, [form.category]);

  // debug helper: call in console to inspect issues
  window.__admin_debug_selects = () => {
    console.log("vendors", vendors.length, vendors);
    console.log("categories", categories.length, categories);
    console.log("subcategories", subcategories.length, subcategories);
    document.querySelectorAll("select").forEach(s=>{
      console.log("select", s.name || s.id, "disabled=", s.disabled, "options=", s.options?.length,
                  "style.pointerEvents=", getComputedStyle(s).pointerEvents,
                  "zIndex=", getComputedStyle(s).zIndex);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: "Bearer " + token } : {}),
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log("Create product response:", data);
      alert(res.ok ? "Created" : (data.message || "Error"));
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-6 relative z-50">
        <h2 className="text-xl font-bold mb-4">Create Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product name"
            className="w-full border p-2 rounded"
            required
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-2 rounded"
            rows="3"
          />

          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border p-2 rounded"
            required
          />

          {/* IMPORTANT: wrapper has z-50 so native select menu appears above overlays */}
          <div className="space-y-3">
            <label className="block text-sm">Vendor</label>
            <div className="relative z-50">
              <select
                name="vendor"
                value={form.vendor}
                onChange={handleChange}
                className="w-full border p-2 rounded bg-white"
              >
                <option value="">Select vendor</option>
                {vendors.map(v => <option key={v._id} value={v._id}>{v.name}</option>)}
              </select>
            </div>

            <label className="block text-sm">Category</label>
            <div className="relative z-50">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border p-2 rounded bg-white"
              >
                <option value="">Select category</option>
                {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>

            <label className="block text-sm">Subcategory</label>
            <div className="relative z-50">
              <select
                name="subcategory"
                value={form.subcategory}
                onChange={handleChange}
                className="w-full border p-2 rounded bg-white"
              >
                <option value="">Select subcategory</option>
                {subcategories.length === 0 ? (
                  <option disabled>No subcategories</option>
                ) : subcategories.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
            <button type="button" onClick={() => { setForm({ name:'', description:'', price:'', vendor:'', category:'', subcategory:'' }); }} className="bg-gray-200 px-4 py-2 rounded">Reset</button>
          </div>
        </form>

        <div className="mt-4 text-xs text-gray-500">
          If selects still don’t open, run <code>__admin_debug_selects()</code> in console.
        </div>
      </div>
    </div>
  );
}

