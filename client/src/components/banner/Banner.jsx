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
    description: "Discover a wide range of men's sneakers with styles for every occasion. Get up to 10% off on top brands and elevate your sneaker game!"
  },
  {
    id: 2,
    img: Image2,
    title: "15% off on all Women's Sneakers",
    description: "Step up your fashion with 15% off on all women's sneakers. Whether for workouts or casual outings, find the perfect pair that suits your style."
  },
  {
    id: 3,
    img: Image3,
    title: "25% off on all Kids' Sneakers",
    description: "Treat your little ones to a new pair of sneakers with 25% off on all kids' sneakers. Comfortable, stylish, and perfect for everyday adventures."
  }
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
    <div className="relative overflow-x-hidden w-screen min-h-screen flex justify-center items-center text-white duration-200 bg-background">
      {/* hero section */}
      <div data-aos="zoom-out"
        data-aos-duration="500" className="container pb-8 sm:pb-0">
        <Slider {...settings}>
          {ImageList.map((data, i) => (
            <div key={i}>
              <div className="grid grid-cols-1 sm:grid-cols-2 bg-background p-4 rounded-md w-full">
                {/* text content section */}
                <div className="flex flex-col w-full justify-start gap-4 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                  <h1
                    className="text-2xl sm:text-6xl lg:text-6xl font-bold text-white"
                  >
                    {data.title}
                  </h1>
                  <p
                    className="text-base sm:text-md lg:text-xl text-white"
                  >
                    {data.description}
                  </p>

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
