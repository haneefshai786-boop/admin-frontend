import { useState } from 'react'
import client, { setAuthToken } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email,setEmail]=useState('admin@gmail.com')
  const [password,setPassword]=useState('123456')
  const [err,setErr]=useState('')
  const navigate=useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    try {
      const res = await client.post('/admin/login', { email, password })
      const { token } = res.data
      localStorage.setItem('adminToken', token)
      setAuthToken(token)
      navigate('/dashboard')
    } catch (err) {
      setErr(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow w-full max-w-md" onSubmit={submit}>
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        {err && <div className="text-red-600 mb-2">{err}</div>}
        <input className="w-full border p-2 rounded mb-2" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input type="password" className="w-full border p-2 rounded mb-2" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  )
}
