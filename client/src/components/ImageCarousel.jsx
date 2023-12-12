import React from 'react'
import Carousel from "react-material-ui-carousel";
import imageOne from '../assets/60.png';
import imageTwo from '../assets/40.png'

const ImageCarousel = () => {
  var items = [
    {
      name: "Be Pleasured by Pinky",
      description: "Where Every Click Sparks Delight",
      image: imageOne,
    },
    {
      name: "Be Pleasured by Pinky",
      description: "Where Every Click Sparks Delight",
      image: imageTwo,
    }
  ]

function Item(props)
  {
    return (
      <div className='relative w-full'>
        <img src={props.item.image} className='w-full h-[700px] object-center object-cover'/>
        <div className="absolute top-[50%] left-20 bg-opacity-50 p-2 md:p-5 rounded-md bg-black">
          <h2 className='text-2xl font-bold tracking-tight text-pink md:text-5xl'>{props.item.name}</h2>
          <p className='text-white text-lg'>{props.item.description}</p>
        </div>
      </div>
    )
  }

  return (
    <Carousel
      className='w-full'
      autoPlay
      duration={3000}
      animation="fade"
      swipe={false}
      indicators={false}
    >
      {
        items.map( (item, i) => <Item key={i} item={item} /> )
      }
    </Carousel>
  )
}

export default ImageCarousel
