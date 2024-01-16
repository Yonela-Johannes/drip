import { Link } from "react-router-dom";
import imageOne from '../assets/40.png'

export default function Hero() {

  return (
    <section className="mx-auto py-2 md:my-20 max-w-2xl sm:pb-6 lg:max-w-7xl">
      <div className="mb-8 flex items-start text-start md:gap-4 gap-2 md:mb-16">
        <div className="flex w-full">
            <img
              src={imageOne}
              alt="Great Photo"
              className="object-cover object-center max-w-[400px] h-[350px] overflow-hidden rounded-lg shadow-black drop-shadow-xl"
            />
        </div>
        <div className="mb-6 flex w-full flex-col justify-center ">
          <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl">
            Top Fashion for a top price!
          </h1>
          <p className="max-w-md leading-relaxed text-gray-500 text-base md:text-xl">
            We sell only the most exclusive and high quality products for you.
            We are the best so come and shop with us.
          </p>
        </div>
      </div>
    </section>
  );
}
