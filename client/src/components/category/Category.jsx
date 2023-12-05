import React from "react"
import "./category.css"
import { GrFormPrevious } from "react-icons/gr"
import { MdNavigateNext } from "react-icons/md"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"

function SampleNextArrow(props) {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='next'>
        <MdNavigateNext className='icon' />
      </button>
    </div>
  )
}

function SamplePrevArrow(props) {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='prev'>
        <GrFormPrevious className='icon' />
      </button>
    </div>
  )
}

export const Category = () => {

  const category = [
    {
      id: 1,
      title: "face & skin care",
      cover: "../images/category/ca1.png",
    },
    {
      id: 2,
      title: "baby care",
      cover: "../images/category/ca2.png",
    },
    {
      id: 3,
      title: "beauty care",
      cover: "../images/category/ca3.png",
    },
    {
      id: 4,
      title: "contraceptive",
      cover: "../images/category/ca4.png",
    },
    {
      id: 5,
      title: "feminine hygiene",
      cover: "../images/category/ca5.png",
    },
    {
      id: 6,
      title: "health & protein",
      cover: "../images/category/ca6.png",
    },
    {
      id: 7,
      title: "health & wellness",
      cover: "../images/category/ca7.png",
    },
    {
      id: 8,
      title: "medicine & first aid",
      cover: "../images/category/ca8.png",
    },
    {
      id: 9,
      title: "oral care",
      cover: "../images/category/ca9.png",
    },
    {
      id: 10,
      title: "pregnacy",
      cover: "../images/category/ca10.png",
    },
    {
      id: 11,
      title: "sexual well-being",
      cover: "../images/category/ca11.png",
    },
    {
      id: 12,
      title: "Household",
      cover: "../images/category/ca12.jpg",
    },
  ]

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
    ],
  }
  return (
    <>
      <section className='category'>
        <div className='bg-gray-400 rounded-md'>
          <Slider {...settings}>
            {category.map((item) => (
              <div className='flex items-center gap-2' key={item.id}>
                <div className='box boxItems'>
                  <img src={item.cover} alt='' />
                  <p className="text-sm capitalize sm:text-lg">{item.title}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  )
}
