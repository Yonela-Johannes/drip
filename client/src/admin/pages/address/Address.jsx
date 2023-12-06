// import { Address } from "@/lib/api/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../../assets/logo.png'

const Address = () => {
  const [city, setCity] = useState("");
  const [town, setTown] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const handleSignIn = async () => {
    // if (phone && password) {
    //   const response = await Address(phone, password);
    //   if (response instanceof AxiosError) {
    //     setToast(response?.response?.data.message);
    //   }
    //   if (response?.username) {
    //     setUserInfo(response);
    //     router.push("/admin/");
    //   }
    // } else {
    //   setToast("Email and Password is required to Address.");
    // }
  };

  return (
    <section className="mb-10">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <img
            src={logo}
            alt="amazon logo"
            className="h-[50px] w-[50px] object-contain object-center"
          />
        </Link>
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-100">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Your details
            </h1>

            <div className="space-y-4 md:space-y-6">
            <div>
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your city
                </label>
                <input
                  type="city"
                  name="city"
                  id="city"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter you city name"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="town"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your town name
                </label>
                <input
                  type="town"
                  name="town"
                  id="town"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter you town name"
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="code"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your area code
                </label>
                <input
                  type="code"
                  name="code"
                  id="code"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your postal code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter you phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full text-black bg-pink-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handleSignIn}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Address;
