import { useEffect, useState } from 'react'
import client from '../api'

export default function Vendors(){
  const [vendors,setVendors]=useState([])
  const [form,setForm]=useState({ name:'', description:'' })

  useEffect(()=>{ load() },[])
  const load=async()=>{ const res=await client.get('/vendors'); setVendors(res.data) }

  const createVendor=async()=>{
    try{
      const res=await client.post('/vendors', form)
      setVendors([res.data, ...vendors]); setForm({ name:'', description:'' })
    }catch(e){ alert(e.response?.data?.message || 'Error') }
  }
  const del=async(id)=>{ if(!confirm('Delete?'))return; await client.delete('/vendors/'+id); setVendors(vendors.filter(v=>v._id!==id)) }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Vendors</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="space-y-3">
            {vendors.map(v=>(
              <div key={v._id} className="p-3 bg-white rounded shadow flex justify-between">
                <div>
                  <div className="font-semibold">{v.name}</div>
                  <div className="text-sm text-gray-600">{v.description}</div>
                </div>
                <button className="text-red-600" onClick={()=>del(v._id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Create Vendor</h3>
          <input className="w-full border p-2 rounded mb-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <input className="w-full border p-2 rounded mb-2" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={createVendor}>Create</button>
        </div>
      </div>
    </div>
  )
}
