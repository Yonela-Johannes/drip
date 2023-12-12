const  ProductComment = require("../models/ProductCommentModel");
const Product = require("../models/ProductModel");

const getProductComments = async (req, res) => {
  const { productId } = req.params
  try {
    const comments = await ProductComment.find({product: productId}).populate('user');
    if (comments) {
      res.status(200).json({comments})
    } else {
      res.status(200).json({comments: []})
    }
  } catch (error) {
    console.log(error)
  }
}

const addProductComment = async (req, res) => {
  const { productId } =  req.params
  const {userId, comment} = req.body
  const newComment = new ProductComment({product: productId, user: userId, comment})
  try {
    const comment = await newComment.save();
    const findProduct = await Product.findById(productId);
    if (comment && findProduct) {
      const updatedProduct = await Product.updateOne({ _id: findProduct?._id }, {
        $push: { commentedUsers: userId }
      });
      res.status(200).json({
        product: updatedProduct,
        comment
      })
    } else {
      res.status(200).send({comment: ''})
    }
  } catch (error) {
    console.log(error)
  }
}

const updateProductComment = async (req, res) => {
  const { commentId } = req.params;
  const { comment, userId } = req.body;

  try {
    // Find the existing user data
    const blogCommentData = await ProductComment.findById(commentId);
    if (blogCommentData) {
      if(userId === blogCommentData.user.toString()){
        // Merge the existing data with the new data
        if (comment === ''){
          const findProduct = await ProductComment.findById(commentId).populate('product');
          if (findProduct) {
            const updateBlog = await Product.findOneAndUpdate({ _id: findProduct.product._id }, {
              $inc: { commentsCount: -1 },
              $pull: { commentedUser: userId }
            });
            await ProductComment.findByIdAndDelete(commentId)
            res.status(200).json({
              status: true,
              message: "Comment deleted successfully",
              product: updateBlog
            });
          } else {
            res.status(200).json({
              status: false,
              message: "Error delete product comment!",
            });
          }
        } else {
          const updatedCommentData = {
            ...blogCommentData.toObject(), // Convert Mongoose document to plain JavaScript object
            comment: comment || blogCommentData.comment,
          };
          // Update the user

          const updatedComment = await ProductComment.findOneAndUpdate({ _id: blogCommentData._id }, updatedCommentData);
          if (updatedComment) {
            res.status(200).json({
              comment: updatedComment,
            });
          } else {
            res.status(200).json({
              comment: updatedComment,
            });
          }
        }

      } else {
        res.status(200).json({
          status: true,
          message: "Error user credentials",
        });
      }
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }

}

module.exports = {
  getProductComments,
  addProductComment,
  updateProductComment
}
