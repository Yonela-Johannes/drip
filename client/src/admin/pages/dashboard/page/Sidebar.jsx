import React from "react";
import { Link } from "react-router-dom";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import LocalOffer from "@material-ui/icons/LocalOffer";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import logo from '../../../../assets/logo.png'

const Sidebar = () => {

  const button = () =>{
    let items = document.querySelectorAll(".Dashboard__item");

}

  return (
    <div className="flex flex-col overflow-hidden h-screen gap-1 w-[360px] p-10 border-r border-gray-500 mr-8">
      <Link to="/">
        <img className="w-12 h-12 object-contain object-center" src={logo} alt="Ecommerce"
        />
      </Link>
      <Link to="/dashboard" className="p-2 transition-all duration-300 font-semibold text-gray-950 cursor-pointer hover:bg-gray-300 items-center gap-1">
        <p className="Dashboard__item" onClick={button}>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link to="/admin/products" className="p-2 transition-all duration-300 font-semibold text-gray-950 cursor-pointer hover:bg-gray-300 items-center gap-1">
          <p className="Dashboard__item"><PostAddIcon /> All Products</p>
      </Link>

      <Link to="/admin/create-product" className="p-2 transition-all duration-300 font-semibold text-gray-950 cursor-pointer hover:bg-gray-300 items-center gap-1">
          <p><AddIcon />Create Product</p>
      </Link>
      <Link to="/admin/orders" className="p-2 transition-all duration-300 font-semibold text-gray-950 cursor-pointer hover:bg-gray-300 items-center gap-1">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users" className="p-2 transition-all duration-300 font-semibold text-gray-950 cursor-pointer hover:bg-gray-300 items-center gap-1">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews" className="p-2 transition-all duration-300 font-semibold text-gray-950 cursor-pointer hover:bg-gray-300 items-center gap-1">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
