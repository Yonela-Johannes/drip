import { Route, Routes, useNavigate } from 'react-router-dom';
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Cart from "./pages/Cart"
import Home from "./pages/Home"
import Product from "./pages/Product"
import Products from "./pages/Products"
import SubDashboard from './admin/pages/dashboard/page/SubDashboard';
import AllProducts from './admin/pages/dashboard/page/AllProducts';
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
import ViewOrder from './admin/pages/ViewOrder';
import Orders from './admin/pages/Orders';
import ViewEnq from './admin/pages/ViewEnq';
import Customers from './admin/pages/Customers';
import Enquiries from './admin/pages/Enquiries';
import CategoryList from './admin/pages/category/CategoryList';
import OrderScreen from './pages/screens/OrderScreen';
import PlaceOrderScreen from './pages/screens/PlaceOrderScreen';
import ShippingScreen from './pages/screens/ShippingScreen';
import { NoticeContext } from './helpers/Notice';
import Wishlist from './pages/Wishlist';
import { GlobalContext } from './helpers/GlobalContext';
import MyOrders from './pages/orders/MyOrders';
import Profile from './admin/pages/profile/Profile';

function App() {

  return (
    <div className='flex flex-col items-center justify-start overflow-hidden min-h-screen'>
      <GlobalContext>
        <Navbar />
          <NoticeContext>
            <div className="w-full pt-36 flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/forgot-password" element={<Forgot />} />
                <Route path="/reset-password/:token" element={<Reset />} />
                {/* User routes */}
                <Route path="/order" element={<PlaceOrderScreen />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/order/:id" element={<OrderScreen />} />
                <Route path="/delivery" element={<ShippingScreen />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/orders" element={<MyOrders />} />
                {/* Admin Routes */}
                <Route path="/dashboard" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="admin/products" element={<AllProducts />} />
                    <Route path="admin/users" element={<AllUsers />} />
                    <Route path="admin/edit/product/:id" element={<EditProduct />} />
                    <Route path="admin/orders" element={<Orders />} />
                    <Route path="admin/order/:id" element={<ViewOrder />} />
                    <Route path="admin/enquiries" element={<Enquiries />} />
                    <Route path="admin/enquiry/:id" element={<ViewEnq />} />
                    <Route path="admin/Customers" element={<Customers />} />
                    <Route path="admin/categories" element={<CategoryList />} />
                  <Route path="admin/user/:id" element={<UpdateUser />} />
                </Route>
              </Routes>
            </div>
          </NoticeContext>
        <div className="bg-neutral-200 flex flex-col w-full items-center justify-center">
          <Footer />
          <DeveloperFooter />
        </div>
      </GlobalContext>
    </div>
  )
}

export default App
