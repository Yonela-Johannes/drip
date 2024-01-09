import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png'
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiInstagramFill } from "react-icons/ri"
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

const   MainFooter = () => {
  const socialLinks = [
    <BsFacebook size={20} />,
    <RiInstagramFill size={22} />,
    <BsTwitter size={20} />,
    <BsLinkedin size={20} />,
  ];

  return (
    <div className="flex flex-col w-full px-4 md:px-10 bg-pink py-4">

      <div className="flex md:items-center gap-1 md:gap-2 font-semibold mb-3">
        <img
          src={logo}
          className="w-10 h-10 object-contain object-left md:object-center"
        />
        <p>Be Pleasured by Pinky</p>
      </div>
      <p className="description mb-4">Here we put your business description/quote/motto
          </p>

      <div className="flex flex-col md:flex-row w-full justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex md:items-center gap-2">
            <HiOutlineLocationMarker size={20} />
            <p className="text-sm md:text-base">7100 Mxolisi walk, Cape Town, South Africa</p>
          </div>

          <div className="flex md:items-center gap-2">
            <AiOutlineMail size={20} />
            <p className="text-sm md:text-base">bepleasuredbypinky@gmail.com</p>
          </div>

          <div className="flex md:items-center gap-2">
            <AiOutlinePhone size={20} />
            <p className="text-sm md:text-base">+27 12 345 6789</p>
          </div>
          <ul className="flex md:items-center mt-2 sm:items-start justify-center sm:justify-start gap-4">
            {socialLinks.map((link, index) => (
              <li key={index}>{link}</li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 md:flex gap-6 mr-4 text-sm md:text-base">
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
