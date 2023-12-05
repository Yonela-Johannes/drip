import { Route, Routes, useNavigate } from 'react-router-dom';
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Cart from "./pages/Cart"
import Home from "./pages/Home"
import Product from "./pages/Product"
import Products from "./pages/Products"
import SubDashboard from './admin/pages/dashboard/page/SubDashboard';
import AllProducts from './admin/pages/dashboard/page/AllProducts';
import CreateProduct from './admin/pages/dashboard/page/CreateProduct';
import AllUsers from './admin/pages/dashboard/page/AllUsers';
import EditProduct from './admin/pages/dashboard/page/EditProduct';
import UpdateUser from './admin/pages/dashboard/page/UpdateUser';
import { DeveloperFooter } from './components/footer/DeveloperFooter';
import Layout from './admin/components/shared/Layout';
import Dashboard from './admin/pages/Dashboard';

function App() {

  return (
    <div className='flex flex-col items-center justify-start overflow-hidden'>
      <Navbar />
      <div className="w-full pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />

          {/* Admin Routes */}
          <Route path="/dashboard" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="admin/products" element={<AllProducts />} />
              <Route path="admin/users" element={<AllUsers />} />
              <Route path="admin/create-product" element={<CreateProduct />} />
              <Route path="admin/edit/product/:id" element={<EditProduct />} />
            <Route path="admin/user/:id" element={<UpdateUser />} />
          </Route>
        </Routes>
      </div>
      <div className="bg-neutral-200 flex flex-col w-full items-center justify-center">
        <Footer />
        <DeveloperFooter />
      </div>
    </div>
  )
}

export default App
