import React from 'react'
import Carousel from "react-material-ui-carousel";
import imageOne from '../assets/60.png';
import imageTwo from '../assets/40.png'

const ImageCarousel = () => {
  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      image: imageOne,
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      image: imageTwo,
    }
  ]

function Item(props)
  {
    return (
      <div className='relative w-full'>
        <img src={props.item.image} className='w-full h-[700px] object-center object-cover'/>
        <div className="absolute top-[50%] left-20">
          <h2 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-6xl'>{props.item.name}</h2>
          <p>{props.item.description}</p>
          <button className='mt-6 text-base sm:text-lg max-w-prose text-muted-foreground'>
            Check it out!
          </button>
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
