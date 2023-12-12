import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getOrderDetails,
  getUserOrders,
} from "../../redux/features/order/orderSlice";
import moment from "moment";
import Loader from "../../components/shared/Loader";
import { useState } from "react";
import MobileFirstOrders from "./MobileFirstOrders";
import { AiOutlineEye } from "react-icons/ai";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { order, loading, success } = useSelector((state) => state?.orders);
  const [mobile, setMobile] = useState(window.innerWidth <= 400);
  const [details, setDetails] = useState(false);
  const handleWindowSizeChange = () => {
    setMobile(window.innerWidth <= 400);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getUserOrders(user?._id));
    }
  }, [user]);

  useEffect(() => {
    if (mobile) {
      setDetails(mobile);
    }
  }, [mobile]);
  console.log(order);

  return (
    <div className="md:px-20">
      {loading ? (
        <Loader />
      ) : mobile ? (
        <div className="flex md:hidden md:items-center bg-gray-50 flex-col px-2 mt-20 mb-2">
          <div className="md:w-full">
            <h3 className="mb-4 font-semibold md:font-normal md:text-2xl">
              My order
            </h3>
            <div className="border-x border-gray-200 rounded-sm mt-3">
                <table className="w-full text-gray-700">
                  <thead>
                    <tr>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Order status</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.orders?.map((odr, i) => (
                      <tr key={odr?._id}>
                        <td>
                          <p>{odr?.orderItems?.length}</p>
                        </td>
                        <td>
                          <p>R{odr?.totalPrice}</p>
                        </td>
                        <td>
                          <p>{odr?.orderStatus}</p>
                        </td>
                        <td>
                          <p>
                            <Link to={`${odr?._id}`}>
                              <AiOutlineEye className="text-[18px]" />
                            </Link>
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          </div>
        </div>
      ) : (
        <>
          <div className="hidden md:flex md:w-full md:items-center bg-gray-50 flex-col px-2 md:px-10 mt-20 md:mt-10 mb-2">
            <div className="md:w-full">
              <h3 className="mb-4 font-semibold md:font-normal md:text-2xl">
                My order
              </h3>
              <div className="border-x border-gray-200 rounded-sm mt-3">
                <table className="w-full text-gray-700">
                  <thead>
                    <tr>
                      <th>Product ID</th>
                      <th>Full name</th>
                      <th>Email</th>
                      <th>Payment Method</th>
                      <th>Order date</th>
                      <th>Paid at</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Order status</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.orders?.map((odr, i) => (
                      <tr key={odr?._id}>
                        <td className="hidden md:block">
                          <p>#{1 + i}</p>
                        </td>
                        <td>
                          <p>
                            {odr?.user?.name} {odr?.user?.lastName}
                          </p>
                        </td>
                        <td>
                          <p>{odr?.user?.email}</p>
                        </td>
                        <td>
                          <p>{odr?.user?.email}</p>
                        </td>
                        <td>
                          <p>{moment(odr?.createdAt).format("dd-mm-yyyy")}</p>
                        </td>
                        <td>
                          <p>{moment(odr?.paidAt).format("dd-mm-yyyy")}</p>
                        </td>
                        <td>
                          <p>{odr?.orderItems?.length}</p>
                        </td>
                        <td>
                          <p>R{odr?.totalPrice}</p>
                        </td>
                        <td>
                          <p>{odr?.orderStatus}</p>
                        </td>
                        <td>
                          <p>
                            <Link to={`${odr?._id}`}>
                              <AiOutlineEye className="text-[18px]" />
                            </Link>
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyOrders;
