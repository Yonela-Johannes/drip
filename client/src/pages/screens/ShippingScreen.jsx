import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutStep from "../../components/shared/CheckoutStep";
import { useNavigate } from "react-router-dom";
import { createAddress, getAddress } from "../../redux/features/address/addressSlice";
import CustomInput from "../../admin/components/CustomInput";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import Button from "../../components/button/Button";
import { toast } from "react-toastify";
import { setOrderInfo } from "../../redux/features/order/orderSlice";

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderDetails } = useSelector((state) => state.orders);
  const { address, isLoading } = useSelector((state) => state.address);
  const { user } = useSelector((state) => state.auth);
  const [addressId, setAddressId] = useState(address?.address?._id)
  const [street, setStreet] = useState(address?.address?.street);
  const [city, setCity] = useState(address?.address?.city);
  const [postalCode, setPostalCode] = useState(address?.address?.postalCode);
  const [town, setTown] = useState(address?.address?.town);

  console.log(orderDetails)
  const getCurrentUserAddress = async () => {
    if(user && user?._id){
      await dispatch(getAddress(user?._id))
    }
  }

  useEffect(() => {
    getCurrentUserAddress()
  }, [])

  useEffect(() => {
    setAddressId(address?.address?._id)
    setStreet(address?.address?.street);
    setCity(address?.address?.city);
    setPostalCode(address?.address?.postalCode);
    setTown(address?.address?.town);
  }, [address])

  const saveAddress = () => {
    if(user?._id?.length < 4) return  toast('No user details provided')
    if(street?.length < 4) return  toast('Please enter your street')
    if(city?.length < 4) return  toast('Please enter your city')
    if(town?.length < 4) return  toast('Please enter your town')
    if(postalCode && postalCode?.length < 4){
      toast('Your area code must be 4 digits')
    }else if(postalCode.length > 4){
      toast('Your postal code must be 4 digits')
    }

    dispatch(createAddress({ data: {
      addressId: address && address?.address && address?.address?._id,
      userId: user?._id,
      street,
      city,
      town,
      postalCode
    }}));

    setTimeout(() => {
      getAddress();
    }, 100)
    toast('Address updated successful')
    setAddressId('')
    setStreet('')
    setCity('')
    setTown('')
    setPostalCode('')
  }

  const saveOrderDetails = () => {
    if(!addressId) return toast('Error: provide you delivery address');
    if(!orderDetails) {
      toast('Error: order details missing')
      navigate('/cart')
    }

    if(user && user?._id && street && city && town && postalCode && orderDetails){
      dispatch(setOrderInfo({
        order: orderDetails,
        addressId: addressId,
        userId: user?._id,
        street,
        city,
        town,
        postalCode,
      }));
      navigate("/order")
    }else{
      toast('More address details required')
    }
  }

  return (
    <MaxWidthWrapper>
      <CheckoutStep step1 step2 />
      <div className="flex flex-col md:flex-row gap-6 px-6 mx-auto lg:py-10 py-4">
        <div className=" rounded-md md:px-10 lg:w-[500px]">
          <div className="flex flex-col md:flex-row">
            <div>
              <h2 className="text-lg md:text-2xl">Delivery</h2>
              <div className="capitalize">
                <div>
                  <p>Street: {address?.address?.street}</p>
                  <div className="flex">
                    <p>City: {address?.address?.city}</p>,{' '}
                    <p>{address?.address?.country}</p>
                  </div>
                </div>
                <div>
                  <p>Town: {address?.address?.town}</p>
                  <p>Postal code: {address?.address?.postalCode}</p>
                </div>
              </div>
            </div>
            <div className="">
              <h1 className="text-lg md:text-2xl">Your delivery details</h1>
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <label
                    htmlFor="street"
                    className="block mb-1 text-sm font-medium text-gray-900"
                  >
                    Street
                  </label>
                </div>
                <CustomInput
                  type="text"
                  name="street"
                  id="street"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  label="Enter street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <label
                    htmlFor="city"
                    className="block mb-1 text-sm font-medium text-gray-900"
                  >
                    City
                  </label>
                </div>
                <CustomInput
                  type="text"
                  name="city"
                  id="city"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  label="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <label
                    htmlFor="phone"
                    className="block mb-1 text-sm font-medium text-gray-900"
                  >
                    Town
                  </label>
                </div>
                <CustomInput
                  type="text"
                  name="town"
                  id="town"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  label="Enter town"
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <label
                    htmlFor="postalCode"
                    className="block mb-1 text-sm font-medium text-gray-900"
                  >
                    Postal code
                  </label>
                </div>
                <CustomInput
                  type="number"
                  name="postalCode"
                  id="postalCode"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  label="Enter postal code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div  onClick={saveAddress}>
                <Button color={true} text="Save" />
              </div>
            </div>
          </div>
          <div className="mt-8"  onClick={saveOrderDetails}>
            <Button text="Continue" />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ShippingScreen;
