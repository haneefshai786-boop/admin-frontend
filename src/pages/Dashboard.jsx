import { useEffect, useState } from 'react'
import client from '../api'

export default function Dashboard(){
  const [stats,setStats]=useState(null)
  useEffect(()=>{
    const load = async ()=>{
      try{
        const [v,c,p] = await Promise.all([
          client.get('/vendors'),
          client.get('/categories'),
          client.get('/products'),
        ])
        setStats({ vendors: v.data.length, categories: c.data.length, products: p.data.length })
      }catch(e){
        console.error(e)
      }
    }
    load()
  },[])
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">Vendors: {stats?.vendors ?? '—'}</div>
        <div className="p-4 bg-white rounded shadow">Categories: {stats?.categories ?? '—'}</div>
        <div className="p-4 bg-white rounded shadow">Products: {stats?.products ?? '—'}</div>
      </div>
    </div>
  )
}
