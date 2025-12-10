import { useEffect, useState } from 'react'
import client from '../api'

export default function Categories(){
  const [categories,setCategories]=useState([])
  const [vendors,setVendors]=useState([])
  const [form,setForm]=useState({ vendor:'', name:'' })

  useEffect(()=>{ load() },[])
  const load=async()=>{ const [c,v]=await Promise.all([client.get('/categories'), client.get('/vendors')]); setCategories(c.data); setVendors(v.data) }

  const create=async()=>{ try{ const res=await client.post('/categories', form); setCategories([res.data,...categories]); setForm({ vendor:'', name:'' }) }catch(e){ alert(e.response?.data?.message || 'Error') } }
  const del=async(id)=>{ if(!confirm('Delete?'))return; await client.delete('/categories/'+id); setCategories(categories.filter(c=>c._id!==id)) }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          {categories.map(c=>(
            <div key={c._id} className="p-3 bg-white rounded shadow flex justify-between">
              <div>
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm text-gray-600">Vendor: {c.vendor?.name || c.vendor}</div>
              </div>
              <button className="text-red-600" onClick={()=>del(c._id)}>Delete</button>
            </div>
          ))}
        </div>
        <div>
          <h3 className="font-semibold mb-2">Create Category</h3>
          <select className="w-full border p-2 rounded mb-2" value={form.vendor} onChange={e=>setForm({...form,vendor:e.target.value})}>
            <option value=''>Select vendor</option>
            {vendors.map(v=> <option key={v._id} value={v._id}>{v.name}</option>)}
          </select>
          <input className="w-full border p-2 rounded mb-2" placeholder="Category name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={create}>Create</button>
        </div>
      </div>
    </div>
  )
}
