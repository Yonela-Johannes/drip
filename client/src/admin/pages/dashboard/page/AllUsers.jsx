import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { ToastContainer, toast } from 'react-toastify';
import { getAdminUsers } from "../../../../redux/features/admin/adminProducts/adminReducer";

const AllUsers = ({ history }) => {
  const { users: items } = useSelector((state) => state.admin);

  const [users, setUsers] = useState([])
  const dispatch = useDispatch()


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
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === ("admin")
          ? "green"
          : "red";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/dashboard/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users?.forEach((item) => {
      rows?.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
      <Fragment>
        <div className="flex w-full pr-10">
          <div className="w-full">
            <h1  className="mb-4 title">Users</h1>

            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          </div>
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
      </Fragment>
  );
};

export default AllUsers;
