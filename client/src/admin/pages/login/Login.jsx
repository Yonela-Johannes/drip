import React, { useEffect, useState } from "react";
// import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { MdClose } from "react-icons/md";

const Login = ({ close, handleSignup  }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {user, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user?._id){
      // navigate('/')
    }
  }, []);

  const handleSignIn = async () => {
    const validateEmail = () => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    if(!email) return toast('Please enter you email.');
    if(!validateEmail()) return toast('Email format incorrect.');
    if(password?.length < 8) return toast('Password too short.');

    if (email && password) {
      const response = await dispatch(login({email, password}));
      if(response.payload.message.includes("Sign in successful")){
        toast(response.payload.message)
        close()
      }else if(response.payload.message === 'Incorrect password.'){
        toast(response.payload.message)
      }
    } else {
      // setToast("Email and Password is required to Login.");
    }
  };

  return (
    <section className="mb-4 md:mb-10">
      <div className='flex justify-end w-full p-2 cursor-pointer' onClick={() => close()}>
        <MdClose size={18} />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center px-6 py-8 mx-auto lg:py-0 mb-4">
        <div className="w-full rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-100">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <div className="space-y-4 md:space-y-6">
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
              <div className="flex items-start justify-between">
                <div className="">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                  </div>
                </div>
              </div>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </Link>

              <button
                type="submit"
                className="w-full text-black bg-pink hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handleSignIn}
              >
                Sign in
              </button>
            </div>
          </div>
          <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?&nbsp;
              <p onClick={() => handleSignup()} className="cursor-pointer text-cyan-700 hover:underline dark:text-cyan-500 duration-200">
                Create account
              </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
