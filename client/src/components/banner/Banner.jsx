import React from "react";
import Image1 from "../../assets/Content/riri.webp";
import Image2 from "../../assets/Content/puma.webp";
import Image3 from "../../assets/Content/pumaO.webp";
import Slider from "react-slick";

const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "Up to 10% off on all Men's Sneakers",
  },
  {
    id: 2,
    img: Image2,
    title: "15% off on all Women's Sneakers",
  },
  {
    id: 3,
    img: Image3,
    title: "25% off on all kids Sneakers",
  },
];

const Banner = () =>
{
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (
    <div className="relative overflow-x-hidden w-screen min-h-screen bg-lgray flex justify-center items-center text-cl duration-200 ">
      {/* background pattern */}
      <div className="w-[500px] h-[500px] md:h-[700px] md:w-[700px] bg-pink2 absolute -top-1/2 right-0 rounded-sm rotate-45"></div>
      {/* hero section */}
      <div data-aos="zoom-out"
        data-aos-duration="500" className="container pb-8 sm:pb-0">
        <Slider {...settings}>
          {ImageList.map((data, i) => (
            <div key={i}>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* text content section */}
                <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                  <h1
                    className="text-2xl sm:text-6xl lg:text-7xl font-bold text-cl"
                  >
                    {data.title}
                  </h1>
                </div>
                {/* image section */}
                <div className="order-1 sm:order-2">
                  <div
                    className="relative z-10"
                  >
                    <img
                      src={data.img}
                      alt="landing"
                      className="w-[300px] h-[300px] sm:h-[450px] rounded-md sm:w-[450px] object-cover mx-auto  "
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
