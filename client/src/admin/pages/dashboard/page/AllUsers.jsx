import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./newProduct.css";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { ToastContainer, toast } from 'react-toastify';
import { deleteUser, getAdminUsers, updateUser } from "../../../../redux/features/admin/adminProducts/adminReducer";
import CustomModal from "../../../components/CustomModal";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import RoleModal from "../../../components/RoleModal";

const AllUsers = ({ history }) => {
  const { users: items } = useSelector((state) => state.admin);

  const [users, setUsers] = useState([])
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState('')
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [userId, setUserId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setUserId(id)
  };

  const hideModal = () => {
    setOpen(false);
  };

  const showRoleModal = (id) => {
    setOpenRoleModal(true);
    setUserId(id)
  };

  const hideRoleModal = () => {
    setOpenRoleModal(false);
  };

  useEffect(() => {
    dispatch(getAdminUsers())
  }, []);

  const fetchUsers = () => {
    setUsers(items)
  }

  useEffect(() => {
    fetchUsers()
  }, [items]);

  const columns = [
    { dataIndex: "id", title: "User ID"},

    {
      dataIndex: "email",
      title: "Email",
    },
    {
      dataIndex: "name",
      title: "Name",
    },

    {
      dataIndex: "role",
      title: "Role",

    },

    {
      dataIndex: "action",
      title: "Actions",
    },
  ];

  const rows = [];

  console.log(role)
  users &&
    users?.forEach((item) => {
      rows?.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
        action: (
          <div className="flex items-center space-around justify-between">
            <Button onClick={() => showRoleModal(item?._id)}>
              <AiFillEdit className='text-[18px]' />
            </Button>
            <Button onClick={() => showModal(item?._id)}>
              <AiFillDelete className='text-[18px]' />
            </Button>
          </div>
        )
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

    const editUserHandler = (id) => {
      if(role?.length < 3) return toast("Please select user role")
      dispatch(updateUser({userId: id, role}));
      setOpenRoleModal(false);
      setTimeout(() => {
        dispatch(getAdminUsers());
      }, 100);
      toast('User role updated')
    };

    console.log(userId)
  return (
      <Fragment>
        <div className="flex w-full pr-10 mt-10">
          <div className="w-full">
            <h1  className="mb-4 text-2xl">Users</h1>
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
          <RoleModal
            hideModal={hideRoleModal}
            open={openRoleModal}
            setRole={setRole}
            performAction={() => {
              editUserHandler(userId);
            }}
            title="Change the user role"
          />
        </div>
      </Fragment>
  );
};

export default AllUsers;
