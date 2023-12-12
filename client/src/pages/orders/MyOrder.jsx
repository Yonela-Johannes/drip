import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import { getOrderDetails } from "../../redux/features/order/orderSlice";
import moment from 'moment'
import Loader from "../../components/shared/Loader";
import { useState } from "react";
import MobileFirstOrders from "./MobileFirstOrders";

const MyOrder = () => {
  const dispatch = useDispatch();
  const { order, loading, success } = useSelector((state) => state?.orders);
  const orderId = useParams()?.id
  const [mobile, setMobile] = useState(window.innerWidth <= 400);
  const [details, setDetails] = useState(false)
  const handleWindowSizeChange = () => {
    setMobile(window.innerWidth <= 400);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  useEffect(() => {
    if(orderId){
      dispatch(getOrderDetails(orderId));
    }
  }, [orderId]);

  useEffect(() => {
    if(mobile){
      setDetails(mobile);
    }
  }, [mobile]);

  return (
    <div className="md:px-20">
      {loading ? (<Loader />) : (
        mobile ? (<MobileFirstOrders details={details} order={order} active={true} />) : (
          <>
          <div className="hidden md:flex md:w-full md:items-center bg-gray-50 flex-col px-2 md:px-10 mt-20 md:mt-10 mb-2">
            <div className="md:w-full">
              <h3 className="mb-4 font-semibold md:font-normal md:text-2xl">My order</h3>
              <div className="border-x border-gray-200 rounded-sm mt-3">
                <table className="w-full text-gray-700">
                  <thead>
                    <tr>
                      <th className="">Product ID</th>
                      <th  className="">Full name</th>
                      <th>Email</th>
                      <th className="">Payment Method</th>
                      <th className="">Order date</th>
                      <th className="">Paid at</th>
                      <th className="">Quantity</th>
                      <th className="">Total</th>
                      <th>Order status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={order?.order?._id}>
                      <td className="hidden md:block">
                        <p>#{order?.order?._id}</p>
                      </td>
                      <td  className="">
                        <p>{order?.order?.user?.name}</p>{' '}<p>{order?.order?.user?.lastName}</p>
                      </td>
                      <td  className="">
                        <p>{order?.order?.user?.email}</p>
                      </td>
                      <td className="">
                        <p>{order?.order?.user?.email}</p>
                      </td>
                      <td className="">
                        <p>{moment(order?.order?.createdAt).format('dd-mm-yyyy')}</p>
                      </td>
                      <td className="">
                        <p>{moment(order?.order?.paidAt).format('dd-mm-yyyy')}</p>
                      </td>
                      <td>
                        <p>{order?.order?.orderItems?.length}</p>
                      </td>
                      <td>
                        <p>R{order?.order?.totalPrice}</p>
                      </td>
                      <td>
                        <p>{order?.order?.orderStatus}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:w-full mb-4 mt-8">
              <h3 className="mb-4 font-semibold md:font-normal md:text-2xl">My order details</h3>
              <div className="border-x border-gray-200 rounded-sm">
                <table className="w-full text-gray-700">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th className="">Product ID</th>
                      <th  className="">Image</th>
                      <th>Product Name</th>
                      <th className="">Order Date</th>
                      <th className="">Quantity</th>
                      <th>Order Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order && order?.order?.orderItems?.map((odr, i) => (
                      <tr key={odr?._id}>
                        <td>
                          <p>{1 + i}</p>
                        </td>
                        <td className="hidden md:block">
                          <p>#{odr?._id}</p>
                        </td>
                        <td  className="">
                          <img src={odr?.imageUrl} className="w-16 h-16 rounded-md object-cover" />
                        </td>
                        <td>
                          <p>{odr?.name}</p>
                        </td>
                        <td className="">
                          <p>{moment(odr?.createdAt).format('dd-mm-yyyy')}</p>
                        </td>
                        <td className="">
                          <p>{odr?.quantity}</p>
                        </td>
                        <td>
                          <p>R{odr?.total}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
        )
      )}
    </div>
  );
};

export default MyOrder;
