import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Table } from "antd";
import CustomModal from "../../admin/components/CustomModal";
import { AiFillDelete } from "react-icons/ai";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";

export default function MyOrders() {
  const [open, setOpen] = useState(false);

  const showModal = (e) => {
    setOpen(true);
    // setCategoryId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const data = []
  const columns = [
    { title: "SNo", dataIndex: "key",  },
    { title: "Name", dataIndex: "name", sorter: (a, b) => a.name.length - b.name.length },
    { title: "Price", dataIndex: "price", sorter: (a, b) => a.name.length - b.name.length },
    { title: "Date", dataIndex: "date", sorter: (a, b) => a.name.length - b.name.length },
    { title: "Payment method", dataIndex: "paymentMethod", sorter: (a, b) => a.name.length - b.name.length },
    { title: "Payment status", dataIndex: "paymentStatatus", sorter: (a, b) => a.name.length - b.name.length },

    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  // const data = [];
  // for (let i = 0; i < category.length; i++) {
  //   data.push({
  //     key: i + 1,
  //     id: category?.[i]._id,
  //     name: category?.[i].title,
  //     price: category?.[i].price,
  //     date: category?.[i].date,
  //     paymentMethod: category?.[i].paymentMethod,
  //     paymentStatus: category?.[i].paymentStatus,
  //     name: category?.[i].title,
  //     action: (
  //       <div className="flex gap-4 items-center justify-start">
  //         <button
  //           className="ms-3 fs-3 text-danger bg-transparent border-0"
  //           onClick={() => showModal(category?.[i]._id)}
  //         >
  //           <AiFillDelete />
  //         </button>
  //       </div>
  //     ),
  //   });
  // }

  const deleteCategory = (e) => {

    setOpen(false);
    setTimeout(() => {

    }, 100);
  };

  const saveCategory = (e) => {
    // if(title < 2) return toast('Please enter category.')

    setTimeout(() => {

    }, 100);
    setTitle('')
  }
  return (
    <MaxWidthWrapper>
      <div className="mt-10">
        <h3 className="mb-4 title">My Orders</h3>
        <div>
          <Table columns={columns} dataSource={data} />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteCategory(categoryId);
          }}
          title="Are you sure you want to delete this Product Category?"
        />
      </div>
    </MaxWidthWrapper>
  );
}
