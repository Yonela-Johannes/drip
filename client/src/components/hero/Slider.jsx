import React from "react"
import "./slider.css"
import one from "../../assets/slide/slide1.png"
import two from "../../assets/slide/slide2.png"
import three from "../../assets/slide/slide3.png"
import  four from "../../assets/slide/slide4.png"

export const Slider = () => {
  const slide = [
    {
      image: one,
    },
    { image: two},
    { image: three},
    { image: four},
  ]

  return (
    <>
      <div className='mt-12'>
        <div className='grid grid-cols-2 items-center justify-center gap-4 rounded-md bg-pink p-6'>
          {slide.map((item, i) => (
            <div className='flex w-full bg-pink items-center justify-center' key={i}>
              <div className='img'>
                <img src={item.image} className="w-[300px]" alt='' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
