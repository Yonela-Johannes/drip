import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts } from "../redux/features/products/productSlice";
import ProductCard from "../components/Products/ProductCard";
import Hero from "../components/Hero";
import Newest from "../components/Newest";
import Banner from "../components/banner/Banner";
import HomeBanner from "../components/banner/HomeBanner";
import Main from "../components/common/Hero";
import { heroapi, popularsales, story } from "../data/data";
import Sales from "../components/common/Sales";

export default function Home()
{
  const { items } = useSelector((state) => state.products);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() =>
  {
    dispatch(getProducts());
  }, []);

  const fetchProducts = () =>
  {
    setProducts(items);
  };

  useEffect(() =>
  {
    fetchProducts();
  }, [items]);

  return (
    <div className="w-screen overflow-x-hidden">
      <Banner />
      <Main heroapi={heroapi} />
      <MaxWidthWrapper>
        <div className="flex flex-col text-center w-full items-center justify-start">
          <h2

            className="text-center self-center p-4 md:p-8 text-xl md:text-2xl m-5 text-black"
          >
            Featured
          </h2>
          <div className="sm:grid grid-cols-4">
            {products
              ?.filter((product) => product?.category?.title === "Featured")
              ?.slice(0, 4)
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        <Hero />
        <Sales endpoint={popularsales} ifExists />
      </MaxWidthWrapper>
      <div data-aos-duration="500" className="relative w-full bg-lgray">
        <div className="h-[200px] w-[200px] bg-pink2 -top-10 absolute right-0 rotate-45"></div>
      </div>
      <MaxWidthWrapper>
        <Newest products={products} />
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        <HomeBanner />
      </MaxWidthWrapper>
    </div>
  );
}
