import React from "react";
import { RiInstagramFill } from "react-icons/ri"
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import MaxWidthWrapper from "./MaxWidthWrapper";
import logo from '../assets/logo.png'
function Footer() {

  const socialLinks = [
    <BsFacebook size={20} />,
    <RiInstagramFill size={22} />,
    <BsTwitter size={20} />,
    <BsLinkedin size={20} />,
  ];
  return (
    <MaxWidthWrapper>
      <footer className="sm:flex justify-between py-3 my-4">
        <div className="flex text-start flex-col items-center justify-center sm:items-start sm:justify-start">
          <div className="self-start mb-2">
            <img src={logo} className='object-center object-contain w-14 h-14 sm:w-16 sm:h-16'/>
            <span>Be Pleasured by Pinky</span>
            <span className="dot">.</span>
          </div>
          <p className="description">
            Build a modern and creative website with and
          </p>

          <ul className="flex items-center sm:items-start justify-center sm:justify-start gap-4">
            {socialLinks.map((link, index) => (
              <li key={index}>{link}</li>
            ))}
          </ul>
        </div>
      </footer>
    </MaxWidthWrapper>
  );
}

export default Footer;
