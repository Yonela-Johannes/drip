import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png'
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";

const   MainFooter = () => {
  return (
    <div className="flex flex-col w-full px-10 bg-pink py-4">

      <div className="flex items-center gap-2 border-b border-b-gray-500 pb-1  font-semibold mb-3">
        <img
          src={logo}
          className="w-10 h-10 object-contain"
        />
        <p>Be Pleasured by Pinky</p>
      </div>
      <div className="flex flex-col md:flex-row w-full justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <HiOutlineLocationMarker size={20} />
            <p>7100 Mxolisi walk, Cape Town, South Africa</p>
          </div>

          <div className="flex items-center gap-2">
            <AiOutlineMail size={20} />
            <p>johannesyonela@gmail.com</p>
          </div>

          <div className="flex items-center gap-2">
            <AiOutlinePhone size={20} />
            <p>069 356 4159</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:flex gap-6 mr-4">
          <div className="">
            <p className="font-semibold text-black">Account</p>
            <Link to="/login"><p>Sign In</p></Link>
            <Link to="/register"><p>Registration</p></Link>
            <Link to="/forgot-password"><p>Forgot Password</p></Link>
          </div>

          <div className="">
            <p className="font-semibold text-black">Follow us</p>
            <Link to="/facebook.com"><p>Facebook</p></Link>
            <Link to="/youtube.com"><p>Youtube</p></Link>
            <Link to="/instagram.com"><p>Instagram</p></Link>
          </div>

          <div className="">
            <p className="font-semibold text-black">Rules</p>
            <Link to="/contact"><p>contact</p></Link>
            <Link to="/about"><p>About</p></Link>
            <Link to="/creator"><p>Chat</p></Link>
          </div>

          <div className="">
            <p className="font-semibold text-black">Business</p>
            <Link to="/support"><p>Support</p></Link>
            <Link to="/rules"><p>Rules</p></Link>
            <Link to="/creator"><p>Chat</p></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
