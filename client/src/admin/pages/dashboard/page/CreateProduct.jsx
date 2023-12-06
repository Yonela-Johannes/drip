import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DiscountIcon from "@material-ui/icons/LocalOffer";
import { ToastContainer, toast } from 'react-toastify';
import Button from "../../../../components/button/Button";

const CreateProduct = ({ history }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [offerPrice, setOfferPrice] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Special",
    "Featured",
    "New"
  ];

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("offerPrice", offerPrice);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });

  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
        <div  className="mb-10 h-full">
          <div className="flex flex-col h-full items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div className="bg-gray-300 rounded-md md:px-10 md:py-8 lg:w-[500px]">
              <h1 className="text-2xl mb-8">Create product</h1>
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <label
                    htmlFor="product"
                    className="block mb-1 text-sm font-medium text-gray-900"
                  >
                    Product
                  </label>
                </div>
                <input
                  type="text"
                  name="product"
                  id="product"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <label
                    htmlFor="discount"
                    className="block mb-1 text-sm font-medium text-gray-900"
                  >
                    Discount
                  </label>
                </div>
                <input
                  type="text"
                  name="discount"
                  id="discount"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter product discount"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
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
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter product price"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                    Description
                  </label>
                </div>
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter product stock amount"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 mb-1">
                <select onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Choose Category</option>
                  {categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-center my-8 rounded-md bg-white w-full mb-8">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={createProductImagesChange}
                  multiple
                />
              </div>

              <div>
                {imagesPreview.map((image, index) => (
                  <img className="mb-10 w-20 h-20 rounded-md object-cover object-center" key={index} src={image} alt="Product Preview" />
                ))}
              </div>

              <Button text="Create Product"  />
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
  );
};

export default CreateProduct;
