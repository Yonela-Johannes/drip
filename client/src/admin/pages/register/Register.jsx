// import { Register } from "@/lib/api/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../../assets/logo.png'

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState("");

  const handleSignIn = async () => {
    // if (email && password) {
    //   const response = await Register(email, password);
    //   if (response instanceof AxiosError) {
    //     setToast(response?.response?.data.message);
    //   }
    //   if (response?.username) {
    //     setUserInfo(response);
    //     router.push("/admin/");
    //   }
    // } else {
    //   setToast("Email and Password is required to Register.");
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
              Create your account
            </h1>

            <div className="space-y-4 md:space-y-6">
            <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your name
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your last name
                </label>
                <input
                  type="last name"
                  name="lastName"
                  id="lastName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="validPassword"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Re-type password
                </label>
                <input
                  type="password"
                  name="validPassword"
                  id="validPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={validPassword}
                  onChange={(e) => setValidPassword(e.target.value)}
                />
              </div>
              <div className="flex items-start justify-between">
                <div className="">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border cursor-pointer border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="font-semibold text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500"
                      >
                        Do have an account <Link className="cursor-pointer text-blue-500 hover:underline" to="/login">login</Link>
                      </label>
                    </div>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  lkjjdskljf
                </a>
              </div>

              <button
                type="submit"
                className="w-full text-black bg-pink-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handleSignIn}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
