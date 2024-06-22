import React from "react";
import BannerImg from "../../assets/Content/bathu.webp";
import { GrSecure } from "react-icons/gr";
import { IoFastFood } from "react-icons/io5";
import { GiFoodTruck } from "react-icons/gi";
import Title from "../../utils/Title";

const HomeBanner = () =>
{
  return (
    <div className="flex py-2 md:my-20 max-w-2xl sm:pb-6 lg:max-w-7xl">
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 items-start justify-start text-start md:gap-4 gap-2 md:mb-16" >
        {/* image section */}
        <div className="md:relative flex w-full bg-black items-start justify-start">
          <img
            src={BannerImg}
            alt=""
            className="absolute left-0 max-w-[400px] h-[350px] self-start justify-start rounded-lg w-full mx-auto shadow-black drop-shadow-xl object-cover"
          />
        </div>

        {/* text details section */}
        <div className="mb-6 flex w-full flex-col justify-center">
          <Title title="Winter Sale Up to 50% Off" />
          <p
            className="text-base md:text-xl text-gray-500 tracking-wide leading-5 mt-1 mb-3"
          >
            Lorem ipsum, dolor sit amet Consectetur adipisicing elit. Eaque
            reiciendis inventore iste ratione ex alias quis magni at optio
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <GrSecure className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-violet-400 dark:bg-violet-400" />
              <p className="text-base md:text-xl">Quality Products</p>
            </div>
            <div className="flex items-center gap-4">
              <IoFastFood className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-orange-400 dark:bg-orange-400" />
              <p className="text-base md:text-xl">Fast Delivery</p>
            </div>
            <div className="flex items-center gap-4">
              <GiFoodTruck className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-green-400 dark:bg-green-400" />
              <p className="text-base md:text-xl">Easy Payment method</p>
            </div>
            <div className="flex items-center gap-4">
              <GiFoodTruck className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-yellow-400 dark:bg-yellow-400" />
              <p className="text-base md:text-xl">Get Offers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
