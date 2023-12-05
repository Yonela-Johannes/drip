import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./AllProducts.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { ToastContainer, toast } from 'react-toastify';
import { getAdminProducts } from "../../../../redux/features/admin/adminProducts/adminReducer";

const AllProducts = ({history}) => {
  const {  items } = useSelector((state) => state.admin);
  const [products, setProducts] = useState([])
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getAdminProducts())
  }, []);

  const fetchProducts = () => {
    setProducts(items)
  }

  useEffect(() => {
    fetchProducts()
  }, [items]);


  const deleteProductHandler = (id) => {

  };

const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      width: 80,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      width: 20,
      flex: 1,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 100,
      flex: 1,
    },

    {
      field: "reviews",
      headerName: "Reviews",
      type: "number",
      width: 50,
      flex: 1,
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
            <Link to={`/dashboard/admin/edit/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
            onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
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

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item?.stockCount,
        price: item?.price,
        name: item?.name,
        reviews: item?.numOfReviews,
      });
    });

    return (
        <Fragment>
          <div className="flex w-full pr-10">
            <div className="w-full">
              <h1 className="text-2xl mb-8">All products</h1>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className=""
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
    )
}

export default AllProducts
