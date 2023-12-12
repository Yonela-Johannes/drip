const Category = require("../models/CategoryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const User = require("../models/UserModel");
const sendResponse = require("../utils/apiResponse");

const createCategory = asyncHandler(async (req, res) => {
  const {userId, title} = req.body
  if(!userId || !title){
    return sendResponse({}, 201, res, 'User not authorized', false)
  }
  const findUser = await User.findById(userId);
  if(findUser?.role === 'admin'){
    try {
      const newCategory = await Category.create({title, user: userId});
      return sendResponse(newCategory, 201, res, 'Category created successful', true)
    } catch (error) {
      console.log(error.message)
      throw new Error(error);
    }
  } else {
    return sendResponse({}, 201, res, 'User not authorized', false)
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    res.json(deletedCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaCategory = await Category.findById(id);
    res.json(getaCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getCategories = asyncHandler(async (req, res) => {
  try {
    const getallCategory = await Category.find();
    res.json(getallCategory);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getCategories,
};
