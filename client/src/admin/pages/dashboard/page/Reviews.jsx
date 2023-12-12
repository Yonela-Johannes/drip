import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { toast } from 'react-toastify';
import { deleteUser, getAdminProducts, getAdminUsers, updateUser } from "../../../../redux/features/admin/adminProducts/adminReducer";
import CustomModal from "../../../components/CustomModal";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { resetState } from "../../../../redux/features/products/productSlice";
import moment from "moment/moment";

const Reviews = () => {
  const { items } = useSelector((state) => state.admin);

  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setUserId(id)
  };

  const hideModal = () => {
    setOpen(false);
  };


  useEffect(() => {
    dispatch(getAdminProducts())
    dispatch(resetState())
  }, []);

  const columns = [
    { dataIndex: "id", title: "Product ID" },

    {
      dataIndex: "name",
      title: "Name",
    },
    {
      dataIndex: "ratings",
      title: "Rating avg",
    },

    {
      dataIndex: "comment",
      title: "Comment",
    },

    {
      dataIndex: "time",
      title: "Time",
    },
    {
      dataIndex: "username",
      title: "User name",
    },
    {
      dataIndex: "lastName",
      title: "Last name",
    }
  ];

  const rows = [];
  // console.log(items)
  items &&
    items?.forEach((item) => {
      rows.push({
        id: item._id,
        name: item?.name,
        ratings: item?.ratings,
        comment: item?.reviews?.map((com) => com?.comment),
        time: item?.reviews?.map((tim) => moment(tim?.time).format('dd-mm-yyyy')),
        username: item?.reviews?.map((name) => name?.user?.name),
        lastName: item?.reviews?.map((name) => name?.user?.lastName)
      });
    });

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAdminUsers());
    }, 100);
    toast('User deleted')
  };
  console.log(items)
  return (
    <Fragment>
      <div className="flex w-full pr-10 mt-10">
        <div className="w-full">
          <h1  className="mb-4 text-2xl">Reviews</h1>
          <Table columns={columns} dataSource={rows} />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteUserHandler(userId);
          }}
          title="Are you sure you want to delete this user?"
        />
      </div>
    </Fragment>
  );
};

export default Reviews;
