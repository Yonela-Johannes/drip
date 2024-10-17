import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar"
import Cart from "./pages/Cart"
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./pages/Home"
import Product from "./pages/Product"
import Products from "./pages/Products"
import AllProducts from './admin/pages/dashboard/page/AllProducts';
import AllUsers from './admin/pages/dashboard/page/AllUsers';
import UpdateUser from './admin/pages/dashboard/page/UpdateUser';
import Layout from './admin/components/shared/Layout';
import Forgot from './admin/pages/forgot-password/Forgot';
import Reset from './admin/pages/forgot-password/Reset';
import Orders from './admin/pages/Orders';
import ViewEnq from './admin/pages/ViewEnq';
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
import MainFooter from './pages/Footer';
import Support from './components/more/Support';
import UserRoute from './PrivateRoute/UserRoute';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Search from './pages/Search';
import Comments from './admin/pages/dashboard/page/Comments';
import Reviews from './admin/pages/dashboard/page/Reviews';
import Success from './pages/success/Success';
import Order from './admin/pages/Order';
import MyOrder from './pages/orders/MyOrder';
import { useEffect } from 'react';

function App()
{
  const { pathname } = useLocation()
  useEffect(() =>
  {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  useEffect(() =>
  {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className='flex flex-col items-center justify-start overflow-hidden min-h-screen'>
      <GlobalContext>
        <Navbar />
        <NoticeContext>
          <div className="w-full flex-1 pt-24 overflow-hidden flex flex-col gap-16 relative">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/forgot-password" element={<Forgot />} />
              <Route path="/reset-password/:token" element={<Reset />} />
              <Route path="/support" element={<Support />} />
              <Route path="/search/:text" element={<Search />} />
              {/* User routes */}
              <Route path="/order" element={<UserRoute><PlaceOrderScreen /></UserRoute>} />
              <Route path="/profile" element={<UserRoute><Profile /></UserRoute>} />
              <Route path="/order/:id" element={<UserRoute><OrderScreen /></UserRoute>} />
              <Route path="/delivery" element={<UserRoute><ShippingScreen /></UserRoute>} />
              <Route path="/wishlist" element={<UserRoute><Wishlist /></UserRoute>} />
              <Route path="/orders" element={<UserRoute><MyOrders /></UserRoute>} />
              <Route path="/orders/:id" element={<UserRoute><MyOrder /></UserRoute>} />
              <Route path="/success" element={<UserRoute><Success /></UserRoute>} />
              {/* Admin Routes */}
              <Route path="/dashboard" element={<PrivateRoute><Layout /></PrivateRoute>}>
                <Route index element={<PrivateRoute><AllProducts /></PrivateRoute>} />
                <Route path="admin/products" element={<PrivateRoute><AllProducts /></PrivateRoute>} />
                <Route path="admin/users" element={<PrivateRoute><AllUsers /></PrivateRoute>} />
                <Route path="admin/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
                <Route path="admin/orders/:id" element={<PrivateRoute><Order /></PrivateRoute>} />
                <Route path="admin/enquiries" element={<PrivateRoute><Enquiries /></PrivateRoute>} />
                <Route path="admin/enquiry/:id" element={<PrivateRoute><ViewEnq /></PrivateRoute>} />
                <Route path="admin/categories" element={<PrivateRoute><CategoryList /></PrivateRoute>} />
                <Route path="admin/user/:id" element={<PrivateRoute><UpdateUser /></PrivateRoute>} />
                <Route path="admin/reviews" element={<PrivateRoute><Reviews /></PrivateRoute>} />
                <Route path="admin/comments" element={<PrivateRoute><Comments /></PrivateRoute>} />
              </Route>
            </Routes>
          </div>
        </NoticeContext>
        <div className="bg-pink flex flex-col w-full items-center justify-center">
          <MainFooter />
        </div>
      </GlobalContext>
    </div>
  )
}

export default App
