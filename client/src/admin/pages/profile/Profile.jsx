import React, { useState, useEffect } from "react";
import MaxWidthWrapper from "../../../components/MaxWidthWrapper";
import CustomInput from "../../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/button/Button";
import { toast } from "react-toastify";
import { editUser, getUser, userUpdate } from "../../../redux/features/auth/authSlice";
import { createAddress, getAddress } from "../../../redux/features/address/addressSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { address, isLoading } = useSelector((state) => state.address);
  const [currentUser, setCurrentUser] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [town, setTown] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const dispatch = useDispatch()

  const getCurrentUser = async () => {
    if(user && user?._id){
      const response = await dispatch(getUser(user?._id))
      if(response?.payload?.user){
        setCurrentUser(response?.payload?.user);
        dispatch(userUpdate(response?.payload?.user));
      }
    }
  }

  const getCurrentUserAddress = () => {
    if(user && user?._id){
      dispatch(getAddress(user?._id))
    }
  }

  useEffect(() => {
    getCurrentUser()
    getCurrentUserAddress()
  }, [])

  useEffect(() => {
    if(address && address?.address && address?.address?._id){
      setStreet(address?.address?.street)
      setCity(address?.address?.city)
      setTown(address?.address?.town)
      setPostalCode(address?.address?.postalCode)
    }
  }, [address])

  const updateUser = () => {
    phone && phone.length < 10 ?  toast('Your phone number must be 10 digits') : phone.length > 10 && toast('Your phone number must be 10 digits')
    dispatch(editUser({userId: user?._id , data: {
      name,
      lastName,
      phone,
      image
    }}));

    setTimeout(() => {
      getCurrentUser();
    }, 100)
    toast('Profile updated successful')
    setName('')
    setLastName('')
    setImage('')
    setPhone('')
  }

  const createAvatarImageChange = (e) => {
    const file = e.target.files[0];

    setImage('');
    setImagePreview('');

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };


  const saveAddress = () => {
    if(user?._id?.length < 4) return  toast('No user details provided')
    if(street?.length < 4) return  toast('Please enter your street')
    if(city?.length < 4) return  toast('Please enter your city')
    if(town?.length < 4) return  toast('Please enter your town')
    if(city?.length < 4) return  toast('Please enter your area code')

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
    setStreet('')
    setCity('')
    setTown('')
    setPostalCode('')
  }

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col md:flex-row gap-6 px-6 mx-auto lg:py-10 py-4">
        <div className=" rounded-md md:px-10 lg:w-[500px]">
        <div>
          <h2 className="text-lg md:text-2xl">Details</h2>
          <div className="capitalize">
            <div>
              <p>Name: {currentUser?.name}</p>
              <p>Surname: {currentUser?.lastName}</p>
            </div>
            <div className="">
              <p>Email: {currentUser?.email}</p>
              <p>Phone number: {currentUser?.number}</p>
            </div>
          </div>
        </div>
          <h1 className="text-lg md:text-2xl">Your profile details</h1>
          <div className="">
          <div className="flex items-start justify-between">
              <div className="flex items-center justify-center my-8 rounded-md bg-white w-full mb-8">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={createAvatarImageChange}
                />
              </div>
              <div>
                {imagePreview && (
                  <img className="mb-10 w-40 h-[100px] rounded-md object-contain object-center" src={imagePreview} alt="Product Preview" />
                )}
              </div>
            </div>
          </div>
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1">
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-medium text-gray-900"
              >

                Name
              </label>
            </div>
            <CustomInput
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              label="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1">
              <label
                htmlFor="lastName"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                Last name
              </label>
            </div>
            <CustomInput
              type="text"
              name="lastName"
              id="lastName"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              label="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1">
              <label
                htmlFor="phone"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                Phone number
              </label>
            </div>
            <CustomInput
              type="tel"
              name="phone"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              label="Enter phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div onClick={updateUser}>
            <Button text='Save' />
          </div>
        </div>
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
          <Button text="Save" />
        </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Profile;
