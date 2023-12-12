import React, { useEffect } from "react";
import { Table, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete, AiFillEdit, AiFillEye, AiOutlineEye } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails, getOrders } from "../../redux/features/order/orderSlice";
import moment from 'moment'
import Loader from "../../components/shared/Loader";

const Order = () => {
  const dispatch = useDispatch();
  const { order, loading, success } = useSelector((state) => state?.orders);
  const orderId = useParams()?.id

  useEffect(() => {
    if(orderId){
      dispatch(getOrderDetails(orderId));
    }
  }, [orderId]);

  const columns = [
    {
      title: "No",
      dataIndex: "n",
    },
    {
      title: "Order No",
      dataIndex: "key",
    },
    {
      title: "Customer",
      dataIndex: "customer",
    },
    {
      title: "Payment No",
      dataIndex: "paymentId",
    },
    {
      title: "Payment method",
      dataIndex: "method",
    },
    {
      title: "Items amount",
      dataIndex: "itemsAmount",
    },
    {
      title: "Delivery price",
      dataIndex: "deliveryAmount",
    },
    {
      title: "Total price",
      dataIndex: "totalAmount",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "total Items",
      dataIndex: "totalItems",
    },
    {
      title: "Order status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const rows = [];
  order &&
    order?.order &&
      rows?.push({
        key: order?.order?._id,
        customer: order?.order?.user?.name,
        paymentId: order?.order?.paymentInfo?.id,
        method: order?.order?.paymentInfo?.status,
        itemsAmount: order?.order.itemsPrice,
        deliveryAmount: order?.order?.deliveryPrice,
        totalAmount: order?.order?.totalPrice,
        date: moment(order?.order?.paidAt).format("dd-mm-yyyy"),
        totalItems: order?.order?.orderItems?.length,
        status: order?.order?.orderStatus,
        action: (
          <div className="flex items-center gap-2 space-around justify-between">
            <Button>
              <AiFillEdit className='text-[18px]' />
            </Button>
          </div>
        )
      });

  const columnsTwo = [
    {
      title: "No",
      dataIndex: "n",
    },
    {
      title: "Product No",
      dataIndex: "key",
    },
    {
      title: "Image",
      dataIndex: 'image',
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
    },
  ];
  let rowTwo = []
  order && order?.order &&
    order?.order?.orderItems?.forEach((item, i) => {
      rowTwo?.push({
        n : 1 + i,
        key: item._id,
        image: (
          <img src={item?.imageUrl} className="w-14 h-14 rounded-md object-cover" alt="order" />
        ),
        name: item?.name,
        price: item?.price,
        quantity: item?.quantity,
        totalAmount: item?.total,
      });
    });

  return (
    <>
      {loading ? (<Loader />) : (
      <div className="flex w-full flex-col pr-10 mt-10">
        <div className="w-full">
          <h3 className="mb-4 text-2xl">Order</h3>
          <div>{<Table columns={columns} dataSource={rows} />}</div>
        </div>
        <div className="w-full">
          <h3 className="mb-4 text-2xl">Orders</h3>
          <div>{<Table columns={columnsTwo} dataSource={rowTwo} />}</div>
        </div>
      </div>
      )}
    </>
  );
};

export default Order;
