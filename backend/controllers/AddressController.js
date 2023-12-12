
const validateMongoDbId = require("../utils/validateMongodbId");
const sendResponse = require("../utils/apiResponse");
const Address = require("../models/AddressModel");

// Update address
// @desc edit user
// @route POST /api/update/:id
// access Admin/User
// Update User Profile
const createAddress = async(req,res) => {
  const { data } = req.body

  if(data){
    try {
      const findAddress = await Address.findOne({_id: data?.addressId, user: data?.userId});
      if(findAddress && data?.addressId){
        const address = await Address.findByIdAndUpdate({_id: findAddress._id, user: data.userId}, {
          street: data?.street || findAddress?.street,
          city: data?.city || findAddress?.city,
          town: data?.town || findAddress?.town,
          postalCode: data?.postalCode || findAddress?.postalCode,
          phoneNo: data?.phoneNo || findAddress?.phoneNo
        }, {
          new: true,
          runValidator: true,
          useFindAndModify: false,
        });
        res.status(200).json({
          message: "Address updated",
          address,
          success: true,
        });
      }else if(data?.userId && data?.street && data?.city && data?.town && data?.postalCode){
        console.log(data)
        const address = await Address.create({
          user: data?.userId,
          street: data?.street,
          city: data?.city,
          town: data?.town,
          postalCode: data?.postalCode,
        });

        res.status(200).json({
          message: "Address created successful",
          address,
          success: true,
        });
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// Update address
// @desc edit user
// @route POST /api/update/:id
// access Admin/User
// Update User Profile
const updateAddress = async(req,res) => {
  const { userId } = req.params
  const { street, city, town, postalCode, phoneNo } = req.body

  try {
    const findAddress = await Address.findById(userId)
    if(findAddress){
      const address = await Address.findByIdAndUpdate(userId, {
        street: street || findAddress?.street,
        city: city || findAddress?.city,
        town: town || findAddress?.town,
        postalCode: postalCode || findAddress?.postalCode,
        phoneNo: phoneNo || findAddress?.phoneNo
      }, {
        new: true,
        runValidator: true,
        useFindAndModify: false,
      });

      console.log(address)
      res.status(200).json({
        address,
        success: true,
      });
    }
  } catch (error) {
    console.log(error)
  }
}


// Admin
// @desc log user out
// @route POST /api/users/logout
// access Public
const getAddress = async (req, res) => {
  const { userId } = req.params;
  console.log(req.params)
  validateMongoDbId(userId);
  try {
    const address = await Address.findOne({user: userId});
    res.json({
      success: true,
      address,
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createAddress,
  getAddress,
  updateAddress,
}
