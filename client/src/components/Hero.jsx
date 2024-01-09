import { Link } from "react-router-dom";
import imageOne from '../assets/40.png'

export default function Hero() {

  return (
    <section className="mx-auto py-2 md:my-20 max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      <div className="mb-8 flex flex-wrap justify-between md:mb-16">
        <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
          <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl">
            Top Fashion for a top price!
          </h1>
          <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">
            We sell only the most exclusive and high quality products for you.
            We are the best so come and shop with us.
          </p>
        </div>

        <div className="flex w-full lg:w-2/3">
          <div className="relative left-12 top-12 z-10 -ml-12 md:left-16 md:top-16 lg:ml-0">
            <img
              src={imageOne}
              alt="Great Photo"
              className="object-cover object-center w-[500px] h-[460px] overflow-hidden rounded-lg drop-shadow-[rgba(243,207,198,9)] shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
