const express = require("express");
const {
  getProductComments,
  addProductComment,
  updateProductComment } = require('../controllers/ProductCommentsController.js');

const productCommentRouter = express.Router();
productCommentRouter.get('/:productId', getProductComments);
productCommentRouter.post('/comment/:productId', addProductComment);
productCommentRouter.patch('/update/:commentId', updateProductComment);


module.exports = productCommentRouter
