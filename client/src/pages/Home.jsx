import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts } from "../redux/features/products/productSlice";
import { Link } from "react-router-dom";
import safety from "../assets/safety.png";
import logo from "../assets/logo.png";
import ProductCard from "../components/Products/ProductCard";
import Hero from "../components/Hero";
import Newest from "../components/Newest";
import Banner from "../components/banner/Banner";
import HomeBanner from "../components/banner/HomeBanner";
import Testimonials from "../components/Testimonials/Testimonials";
import Rules from "../components/more/Rules";

export default function Home() {
  const { items } = useSelector((state) => state.products);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const fetchProducts = () => {
    setProducts(items);
  };

  useEffect(() => {
    fetchProducts();
  }, [items]);

  return (
    <div className="w-screen overflow-x-hidden">
      <Banner />
      <MaxWidthWrapper>
        <div className="flex flex-col text-center w-full items-center justify-start">
          <h2

            className="text-center self-center p-4 md:p-8 text-xl md:text-2xl m-5 text-black"
          >
            Featured
          </h2>
          <div  className="sm:grid grid-cols-4">
            {products
              ?.filter((product) => product?.category?.title === "Featured")
              ?.slice(0, 4)
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </div>
        <Hero />
        </MaxWidthWrapper>
        <div   data-aos-duration="500" className="relative w-full bg-lgray">
        <div className="h-[200px] w-[200px] bg-pink2 -top-10 absolute right-0 rotate-45"></div>
          <MaxWidthWrapper>
            <div className="flex flex-col">
              <div className="relative py-20 mx-auto sm:text-center flex flex-col items-center ">
                <div className="flex items-start justify-start gap-4">
                  <h1

                    className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-4xl"
                  >
                    Presenting your marketplace for high quality premium{" "}
                    <span className="">
                      digital assets
                    </span>
                    .
                  </h1>
                  <img

                    src={logo}
                    className="object-center object-contain w-20 h-20 sm:w-28 sm:h-28"
                  />
                </div>
                <p

                  className="mt-6 text-base md:text-xl max-w-prose text-black"
                >
                  Welcome to,{" "}
                  <span className="">Be Pleasured by Pinky</span>.
                  Every asset on our platform is verified by our team to ensure our
                  highest quality standards. Explore a variety of offerings designed
                  to elevate your online experience. Welcome to the hub of digital
                  pleasure.
                </p>
                <img src={safety} className="object-center object-contain w-[100px] md:w-[200px]" />
              </div>
            </div>
          </MaxWidthWrapper>
        </div>
        <MaxWidthWrapper>
          <Newest products={products} />
          <HomeBanner />
          <Testimonials />
          <Rules />
        </MaxWidthWrapper>
    </div>
  );
}
