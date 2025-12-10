import { useEffect, useState } from 'react'
import client from '../api'

export default function Products(){
  const [products,setProducts]=useState([])
  const [vendors,setVendors]=useState([])
  const [categories,setCategories]=useState([])
  const [subs,setSubs]=useState([])
  const [form,setForm]=useState({ vendor:'', category:'', subcategory:'', name:'', price:0 })

  useEffect(()=>{ load() },[])
  const load=async()=>{ const [p,v,c,s]=await Promise.all([client.get('/products'), client.get('/vendors'), client.get('/categories'), client.get('/subcategories')]); setProducts(p.data); setVendors(v.data); setCategories(c.data); setSubs(s.data) }

  const create=async()=>{ try{ const res=await client.post('/products', form); setProducts([res.data,...products]); setForm({ vendor:'', category:'', subcategory:'', name:'', price:0 }) }catch(e){ alert(e.response?.data?.message || 'Error') } }
  const del=async(id)=>{ if(!confirm('Delete?'))return; await client.delete('/products/'+id); setProducts(products.filter(p=>p._id!==id)) }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          {products.map(p=>(
            <div key={p._id} className="p-3 bg-white rounded shadow flex justify-between">
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-gray-600">₹{p.price} • {p.vendor?.name || p.vendor}</div>
              </div>
              <button className="text-red-600" onClick={()=>del(p._id)}>Delete</button>
            </div>
          ))}
        </div>
        <div>
          <h3 className="font-semibold mb-2">Create Product</h3>
          <select className="w-full border p-2 rounded mb-2" value={form.vendor} onChange={e=>setForm({...form,vendor:e.target.value})}>
            <option value=''>Select vendor</option>
            {vendors.map(v=> <option key={v._id} value={v._id}>{v.name}</option>)}
          </select>
          <select className="w-full border p-2 rounded mb-2" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
            <option value=''>Select category</option>
            {categories.map(c=> <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          <select className="w-full border p-2 rounded mb-2" value={form.subcategory} onChange={e=>setForm({...form,subcategory:e.target.value})}>
            <option value=''>Select subcategory</option>
            {subs.map(s=> <option key={s._id} value={s._id}>{s.name}</option>)}
          </select>
          <input className="w-full border p-2 rounded mb-2" placeholder="Product name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <input className="w-full border p-2 rounded mb-2" placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={create}>Create</button>
        </div>
      </div>
    </div>
  )
}
