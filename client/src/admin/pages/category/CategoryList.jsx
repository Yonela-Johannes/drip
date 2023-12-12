import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import {
  createCategory,
  deleteAProductCategory,
  getCategories,
  resetState,
} from "../../../redux/features/category/categorySlice";

import CustomModal from "../../components/CustomModal";
import CustomInput from "../../components/CustomInput";
import { toast } from "react-toastify";

const columns = [
  {
    title: "ID",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const CategoryList = () => {
  const { user } = useSelector((state) => state.auth)
  const category = useSelector((state) => state.category.categories);
  const [title, setTitle] = useState('')
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setCategoryId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);


  const data1 = [];
  for (let i = 0; i < category.length; i++) {
    data1.push({
      key: category?.[i]?._id,
      name: category?.[i].title,
      action: (
        <div className="flex gap-4 items-center justify-start">
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(category?.[i]._id)}
          >
            <AiFillDelete />
          </button>
        </div>
      ),
    });
  }

  const deleteCategory = (e) => {
    dispatch(deleteAProductCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
    toast('Category deleted')
  };

  const saveCategory = () => {
    if(title < 2) return toast('Please enter category.')
    if(!user?._id) return toast('No user details provided.');
    dispatch(createCategory({title, userId: user?._id}))
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
    setTitle('')
  }

  return (
    <div className="mt-10">
    <div>
      <h3 className="mb-4  text-2xl">
        Category
      </h3>
      <div>
        <div className="flex my-4 items-center gap-4 justify-start">
          <CustomInput
            type="text"
            label="Enter Product Category"
            id="category"
            name="category"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={saveCategory}
            className="bg-pink border-0 rounded-3 cursor-pointer px-4 py-2 hover:underline duration-200"
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    </div>
    <div>
      <h3 className="mb-4 text-2xl">Product Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
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
    </div>
  );
};

export default CategoryList;
