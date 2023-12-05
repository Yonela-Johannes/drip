import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
// import "./dashboard.css";
import {Link} from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import DashboardWrapper from "../../../components/DashboardWrapper";
import { getAdminProducts, getAdminUsers } from "../../../../redux/features/admin/adminProducts/adminReducer";
// import MetaData from "../../more/Metadata.js";
// import Loading from "../../more/Loader.js";
// import { getAdminProduct } from "../../actions/ProductActions.js";
// import { getAllOrders } from "../../actions/OrderAction.js";
// import { getAllUsers } from "../../actions/userAction.js";

const SubDashboard = () => {

  const dispatch = useDispatch();

  // const { orders } = useSelector((state) => state.AllOrders);

  // const { users } = useSelector((state) => state.allUsers);
  const [users, setUsers] = useState([])
  const {  items, users: us } = useSelector((state) => state.admin);
  const [products, setProducts] = useState([])


  useEffect(() => {
    dispatch(getAdminProducts())
    dispatch(getAdminUsers())
  }, []);

  const fetchProducts = () => {
    setProducts(items)
  }

  const fetchUsers = () => {
    setUsers(us)
  }

  useEffect(() => {
    fetchProducts()
  }, [items]);

  useEffect(() => {
    fetchUsers()
  }, [us]);


   let outOfStock = 0;

   products &&
    products?.forEach((item) => {
      if (item.stockCount === 0) {
        outOfStock += 1;
      }
    });

    console.log(users)

    // useEffect(() => {
    //     dispatch(getAdminProduct());
    //     dispatch(getAllOrders());
    //     dispatch(getAllUsers());
    //   }, [dispatch]);

    // let totalAmount = 0;
    //   orders &&
    //     orders.forEach((item) => {
    //       totalAmount += item.totalPrice;
    //     });

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["#3BB77E"],
            hoverBackgroundColor: ["#3BB77E"],
            // data: [0, totalAmount],
          },
        ],
      };

      console.log(products?.length- outOfStock)
     const doughnutState = {
      labels: ["Out of Stock", "InStock"],
      datasets: [
        {
          backgroundColor: ["#00A6B4", "#6800B4"],
          hoverBackgroundColor: ["#4B5000", "#35014F"],
          data: [outOfStock, products?.length - outOfStock],
        },
      ],
    };

    return (
       <>
       <DashboardWrapper>
          <div className="flex w-full">
          <Sidebar />
          <div className="w-full">
            <p  className="text-2xl mb-8">Dashboard Overview</p>
            <div className="flex text-center p-5 w-full">
              <div>
                <p>
                  {/* Total Amount <br /> ${totalAmount} */}
                </p>
              </div>
              <div className="text-black font-semibold text-center p-6 m-4 rounder-lg flex items-center justify-center">
                <Link to="/admin/products">
                  <p>Product</p>
                  <p>{products && products?.length}</p>
                </Link>
                <Link to="/admin/orders">
                  <p>Orders</p>
                  {/* <p>{orders && orders.length}</p> */}
                </Link>
                <Link to="/admin/users">
                  <p>Users</p>
                  <p>{users && users?.length}</p>
                </Link>
              </div>
            </div>

            {/* <div className="w-[80%]">
              <Line data={lineState} />
            </div> */}

            {/* <div className="w-[80%]">
              <Doughnut data={doughnutState} />
            </div> */}
          </div>
        </div>
       </DashboardWrapper>
       </>
    );
  };
export default SubDashboard
