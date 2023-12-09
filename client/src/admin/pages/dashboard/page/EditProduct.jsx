import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
    // eslint-disable-next-line
import DiscountIcon from "@material-ui/icons/LocalOffer";
import SideBar from "./Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import { getAdminProduct } from "../../../../redux/features/admin/adminProducts/adminReducer";
import DashboardWrapper from "../../../components/DashboardWrapper";
import { getCategories } from "../../../../redux/features/category/categorySlice";

const EditProduct = ({ history, match }) => {
  const [product, setProduct] = useState({});
  const categories = useSelector((state) => state.category.categories);
  const params = useParams()
  const dispatch = useDispatch();
  const { id } = params;

  const { item } = useSelector((state) => state.admin);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
      // eslint-disable-next-line
  const [offerPrice, setOfferPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const getProduct = async () => {
    if(id){
      dispatch(getAdminProduct(id))
    }
  }

  useEffect(() => {
    getProduct()
  }, [id])

  useEffect(() => {
    setProduct(item?.product)
  }, [item])

  useEffect(() => {
    if (product && product?._id !== id) {

    } else {
      setName(product?.name);
      setDescription(product?.description);
      setPrice(product?.price);
      setCategory(product?.category);
      setStock(product?.stockCount);
      setOfferPrice(product?.Stock);
      setOldImages(product?.images);
    }

    // if (isUpdated) {
    //   toast.success("Product Updated Successfully");
    //   history.push("/admin/products");

    // }
  }, [
    product,
    dispatch,
    id
  ]);

  const updateProductSubmitHandler  = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("offerPrice", offerPrice);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });

  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
      <Fragment>
        <div className="flex w-full pr-10">
          <div className="w-full">
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={updateProductSubmitHandler}
            >
              <h1 className="text-2xl mb-8">Update product</h1>

              <div>
                <SpellcheckIcon />
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <DiscountIcon />
                <input
                  type="String"
                  placeholder="Discount Percent *optional"
                  onChange={(e) => setOfferPrice(e.target.value)}
                />
              </div>
              <div>
                <AttachMoneyIcon />
                <input
                  type="number"
                  placeholder="Product Price"
                  required
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </div>

              <div>
                <DescriptionIcon />

                <textarea
                  placeholder="Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="1"
                ></textarea>
              </div>

              <div>
                <AccountTreeIcon />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories?.map((category) => (
                    <option key={category?._id} value={category?._id}>
                      {category?.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <StorageIcon />
                <input
                  type="number"
                  placeholder="Stock"
                  required
                  onChange={(e) => setStock(e.target.value)}
                  value={Stock}
                />
              </div>

              <div id="createProductFormFile">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={updateProductImagesChange}
                  multiple
                />
              </div>

              <div id="createProductFormImage">
                {oldImages &&
                  oldImages.map((image, index) => (
                    <img key={index} src={image.url} alt="Old Product Preview" />
                  ))}
              </div>

              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
                ))}
              </div>

              <Button
                id="createProductBtn"
                type="submit"
              >
                Update
              </Button>
            </form>
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

export default EditProduct;
