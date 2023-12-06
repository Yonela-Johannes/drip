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
import Login from './admin/pages/login/Login';
import Register from './admin/pages/register/Register';
import Forgot from './admin/pages/forgot-password/Forgot';
import Reset from './admin/pages/forgot-password/Reset';
import Address from './admin/pages/address/Address';
import ViewOrder from './admin/pages/ViewOrder';
import Orders from './admin/pages/Orders';
import ViewEnq from './admin/pages/ViewEnq';
import Customers from './admin/pages/Customers';
import Enquiries from './admin/pages/Enquiries';
import AddCategory from './admin/pages/category/AddCategory';
import CategoryList from './admin/pages/category/CategoryList';

function App() {

  return (
    <div className='flex flex-col items-center justify-start overflow-hidden min-h-screen'>
      <Navbar />
      <div className="w-full pt-24 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/reset-password/:token" element={<Reset />} />
          <Route path="/address" element={<Address />} />

          {/* Admin Routes */}
          <Route path="/dashboard" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="admin/products" element={<AllProducts />} />
              <Route path="admin/users" element={<AllUsers />} />
              <Route path="admin/create-product" element={<CreateProduct />} />
              <Route path="admin/edit/product/:id" element={<EditProduct />} />
              <Route path="admin/orders" element={<Orders />} />
              <Route path="admin/order/:id" element={<ViewOrder />} />
              <Route path="admin/enquiries" element={<Enquiries />} />
              <Route path="admin/enquiry/:id" element={<ViewEnq />} />
              <Route path="admin/Customers" element={<Customers />} />
              <Route path="admin/create-category" element={<AddCategory />} />
              <Route path="admin/categories" element={<CategoryList />} />
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
