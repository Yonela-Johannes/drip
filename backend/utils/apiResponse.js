// create token and saving that in cookies
const sendResponse = (user = {},statusCode,res, message, success) => {
  // Options for cookies
 res.status(statusCode).cookie("token", user.token).json({
  success,
  user,
  message
 });
}

module.exports = sendResponse;
