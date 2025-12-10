import { useEffect, useState } from 'react'
import client from '../api'

export default function Subcategories(){
  const [subs,setSubs]=useState([])
  const [vendors,setVendors]=useState([])
  const [categories,setCategories]=useState([])
  const [form,setForm]=useState({ vendor:'', category:'', name:''})

  useEffect(()=>{ load() },[])
  const load=async()=>{ const [s,v,c]=await Promise.all([client.get('/subcategories'), client.get('/vendors'), client.get('/categories')]); setSubs(s.data); setVendors(v.data); setCategories(c.data) }

  const create=async()=>{ try{ const res=await client.post('/subcategories', form); setSubs([res.data,...subs]); setForm({ vendor:'', category:'', name:'' }) }catch(e){ alert(e.response?.data?.message || 'Error') } }
  const del=async(id)=>{ if(!confirm('Delete?'))return; await client.delete('/subcategories/'+id); setSubs(subs.filter(s=>s._id!==id)) }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Subcategories</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          {subs.map(s=>(
            <div key={s._id} className="p-3 bg-white rounded shadow flex justify-between">
              <div>
                <div className="font-semibold">{s.name}</div>
                <div className="text-sm text-gray-600">Category: {s.category?.name || s.category}</div>
              </div>
              <button className="text-red-600" onClick={()=>del(s._id)}>Delete</button>
            </div>
          ))}
        </div>
        <div>
          <h3 className="font-semibold mb-2">Create Subcategory</h3>
          <select className="w-full border p-2 rounded mb-2" value={form.vendor} onChange={e=>setForm({...form,vendor:e.target.value})}>
            <option value=''>Select vendor</option>
            {vendors.map(v=> <option key={v._id} value={v._id}>{v.name}</option>)}
          </select>
          <select className="w-full border p-2 rounded mb-2" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
            <option value=''>Select category</option>
            {categories.map(c=> <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          <input className="w-full border p-2 rounded mb-2" placeholder="Subcategory name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={create}>Create</button>
        </div>
      </div>
    </div>
  )
}
