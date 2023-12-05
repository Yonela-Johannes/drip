import React from "react"
import { AiFillTwitterCircle, AiFillLinkedin } from "react-icons/ai"
import { BsFacebook } from "react-icons/bs"
import { RiInstagramFill } from "react-icons/ri"

export const DeveloperFooter = () => {
  return (
    <div className="'mx-auto w-full max-w-screen-xl px-2.5  overflow-hidden pb-8">
      <footer>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
          <p>Be Pleasured by Pinky - All right reserved - Design & Developed by Yonela Johannes</p>
          <div className='flex items-center gap-4'>
            <BsFacebook className='icon' size={20} />
            <RiInstagramFill className='icon' size={20} />
            <AiFillTwitterCircle className='icon' size={20} />
            <AiFillLinkedin className='icon' size={20} />
          </div>
        </div>
      </footer>
    </div>
  )
}
