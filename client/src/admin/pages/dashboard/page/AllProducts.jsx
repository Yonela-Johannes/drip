import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./AllProducts.css";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { ToastContainer, toast } from 'react-toastify';
import { getAdminProducts } from "../../../../redux/features/admin/adminProducts/adminReducer";
import { getCategories } from "../../../../redux/features/category/categorySlice";
import Button from "../../../../components/button/Button";
import { createProduct } from "../../../../redux/features/products/productSlice";
import CustomInput from "../../../components/CustomInput";

const AllProducts = () => {
  const {  items } = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.auth);
  const categories = useSelector((state) => state.category.categories);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState('');
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminProducts())
    dispatch(getCategories());
  }, []);

  const fetchProducts = () => {
    setProducts(items)
  }

  useEffect(() => {
    fetchProducts()
  }, [items]);

  const createProductSubmitHandler = (e) => {

    if(name?.length < 5) return toast('Name too short');
    if(price?.length < 3) return toast('Enter price');
    if(description?.length < 35) return toast('Description too short');
    if(!category) return toast('Select Category');
    if(stock === 0) return toast('Enter stock');
    if(!image) return toast('Select item image');

    dispatch(createProduct({userId: user?._id, product: {
      name,
      price,
      description,
      category,
      stock,
      image
    }}));
    toast('Item added to shop');
    setProducts("")
    setName("")
    setPrice("")
    setDescription("")
    setCategory("")
    setStock("")
    setImage("")
    setImagePreview("")
    setTimeout(() => {
      dispatch(getAdminProducts())
      dispatch(getCategories());
    }, 100)
  };

  const createProductImagesChange = (e) => {
    const file = e.target.files[0];

    setImage('');
    setImagePreview('');

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

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
    <div className="flex">
      <div className="h-full">
        <div className="flex flex-col  px-6 mx-auto lg:py-0">
          <div className=" rounded-md md:px-10 lg:w-[500px]">
            <h1 className="text-2xl">New product</h1>
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <label
                  htmlFor="product"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Product
                </label>
              </div>
              <CustomInput
                type="text"
                name="product"
                id="product"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                label="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <label
                  htmlFor="price"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Price
                </label>
              </div>
              <CustomInput
                type="number"
                name="price"
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                label="Enter product price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <label
                  htmlFor="description"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Description
                </label>
              </div>
              <textarea
                type="text"
                name="description"
                id="description"
                className="form-control bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              />
            </div>
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <label
                  htmlFor="stock"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  In stock
                </label>
              </div>
              <CustomInput
                type="number"
                name="stock"
                id="stock"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                label="Enter in stock amount"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 mb-1">
              <select className="px-4 py-2 w-full" onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option className="text-black" key={category?._id} value={category?._id}>
                    {category?.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-start justify-between">
              <div className="flex items-center justify-center my-8 rounded-md bg-white w-full mb-8">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={createProductImagesChange}
                />
              </div>
              <div>
                {imagePreview && (
                  <img className="mb-10 w-40 h-[100px] rounded-md object-contain object-center" src={imagePreview} alt="Product Preview" />
                )}
              </div>
            </div>
            <div  onClick={createProductSubmitHandler}>
              <Button text="Create Product"  />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full pr-10">
        <div className="w-full">
          <h1 className="text-2xl mb-[32px]">Products</h1>
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
    </div>
  )
}

export default AllProducts
