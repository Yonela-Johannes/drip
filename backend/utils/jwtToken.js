// create token and saving that in cookies
const sendToken = (user,statusCode,res, message) => {
    // Options for cookies
   res.status(statusCode).cookie("token", user.token).json({
       success: true,
       user,
       message
   });
}

module.exports = sendToken;
