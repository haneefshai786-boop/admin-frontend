import { Link, useNavigate } from 'react-router-dom';
import { setAuthToken } from '../api';

export default function AdminNav(){
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAuthToken(null);
    navigate('/');
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <div className="text-xl font-bold">Admin Panel</div>
        <nav className="flex gap-4 items-center">
          <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
          <Link to="/vendors" className="text-gray-700 hover:text-blue-600">Vendors</Link>
          <Link to="/categories" className="text-gray-700 hover:text-blue-600">Categories</Link>
          <Link to="/subcategories" className="text-gray-700 hover:text-blue-600">Subcategories</Link>
          <Link to="/products" className="text-gray-700 hover:text-blue-600">Products</Link>
          {token ? <button onClick={logout} className="ml-4 bg-red-500 text-white px-3 py-1 rounded">Logout</button> : null}
        </nav>
      </div>
    </header>
  );
}
