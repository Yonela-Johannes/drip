import { Link } from "react-router-dom";
import imageOne from "../assets/Content/nikees.webp";

export default function Hero() {
  return (
    <section className="mx-auto py-2 md:my-20 max-w-2xl lg:max-w-7xl bg-background p-4 rounded-lg">
      <div className="lg:flex items-start text-start md:gap-4">
        <div className="flex w-full">
          <img
            src={imageOne}
            alt="Great Photo"
            className="object-cover object-center w-[300px] h-[350px] lg:h-[400px] lg:w-full overflow-hidden rounded-lg shadow-black drop-shadow-xl"
          />
        </div>
        <div className="mb-6 flex w-full flex-col justify-center ">
          <h1 className="mb-1 text-xl font-bold text-white lg:text-4xl md:mb-8 md:text-4xl">
            Exclusive Fashion at Unbeatable Prices!
          </h1>
          <p className="max-w-md leading-relaxed text-cl text-base md:text-xl">
            Discover a curated selection of high-quality, premium products
            designed just for you. Elevate your style with the best in
            fashion—shop with us today and experience luxury like never before."
          </p>
        </div>
      </div>
    </section>
  );
}
