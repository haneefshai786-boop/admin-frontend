import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Vendors from './pages/Vendors'
import Categories from './pages/Categories'
import Subcategories from './pages/Subcategories'
import Products from './pages/Products'
import AdminNav from './components/AdminNav'

function PrivateRoute({ children }) {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/" replace />;
}

export default function App(){
  const location = useLocation();
  const hideNav = location.pathname === "/"; // hide nav on login page

  return (
    <div>
      {!hideNav && <AdminNav />}

      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/vendors"
          element={
            <PrivateRoute>
              <Vendors />
            </PrivateRoute>
          }
        />

        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <Categories />
            </PrivateRoute>
          }
        />

        <Route
          path="/subcategories"
          element={
            <PrivateRoute>
              <Subcategories />
            </PrivateRoute>
          }
        />

        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
