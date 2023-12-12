import React, { useEffect } from "react";
import { Table, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete, AiFillEdit, AiFillEye, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders } from "../../redux/features/order/orderSlice";
import moment from 'moment'

const Orders = () => {
  const dispatch = useDispatch();
  const { order, loading, success } = useSelector((state) => state?.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

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
  order && order?.orders?.length > 1 &&
    order?.orders?.forEach((item, i) => {
      rows?.push({
        n : 1 + i,
        key: item._id,
        customer: item?.user?.name,
        paymentId: item?.paymentInfo?.id,
        method: item?.paymentInfo?.status,
        itemsAmount: item.itemsPrice,
        deliveryAmount: item?.deliveryPrice,
        totalAmount: item?.totalPrice,
        date: moment(item?.paidAt).format("dd-mm-yyyy"),
        totalItems: item?.orderItems?.length,
        status: item?.orderStatus,
        action: (
          <div className="flex items-center gap-2 space-around justify-between">
            <Button>
              <AiFillEdit className='text-[18px]' />
            </Button>
            <Link to={`${item?._id}`}>
              <AiOutlineEye className='text-[18px]' />
            </Link>
          </div>
        )
      });
    });

  return (
    <div className="flex w-full pr-10 mt-10">
      <div className="w-full">
          <h3 className="mb-4 text-2xl">Orders</h3>
        <div>{<Table columns={columns} dataSource={rows} />}</div>
      </div>
    </div>
  );
};

export default Orders;
