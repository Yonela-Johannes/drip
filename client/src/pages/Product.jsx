import ImageSlider from '../components/ImageSlider'
import MaxWidthWrapper from '../components/MaxWidthWrapper'
import ProductReel from '../components/ProductReel'
import { product_categories } from '../config'
import { useEffect, useState } from 'react'
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom'
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/features/cart/cartSlice';
import { BiCartAdd } from "react-icons/bi";
import { getProduct } from '../redux/features/products/productSlice';
import Rating from '../components/shared/Rating'

const BREADCRUMBS = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Products', href: '/products' },
]
const Product = () => {
  const { item } = useSelector((state) => state.products);
  const [product, setProduct] = useState([])
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const params = useParams()
  const {id} = params;
  const dispatch = useDispatch()

  useEffect(() => {
    if(id){
      dispatch(getProduct(id))
    }
  }, [id]);

  const fetchProduct = () => {
    setProduct(item)
  }

  useEffect(() => {
    fetchProduct()
  }, [item]);

  const reviewSubmitHandler = (e) => {
    e.preventDefault();

    // const myForm = new FormData();

    // myForm.set("rating", rating);
    // myForm.set("comment", comment);
    // myForm.set("productId", match.params.id);

    // {
    //   isAuthenticated !== true ? history.push(`/login?redirect=/`) : <></>;
    // }

    // dispatch(newReview(myForm));

    // {
    //   comment.length === 0
    //     ? toast.error("Please fill the comment box")
    //     : toast.success("Review done successfully reload for watch it");
    // }
    // dispatch({ type: NEW_REVIEW_RESET });
  };

  return (
    <MaxWidthWrapper className='bg-white'>
      <div className='bg-white'>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
          {/* Product Details */}
          <div className='lg:max-w-lg lg:self-end'>
            <ol className='flex items-center space-x-2'>
              {BREADCRUMBS?.map((breadcrumb, i) => (
                <li key={breadcrumb?.href}>
                  <div className='flex items-center text-sm'>
                    <Link
                      href={breadcrumb?.href}
                      className='font-medium text-sm text-muted-foreground hover:text-gray-900'>
                      {breadcrumb?.name}
                    </Link>
                    {i !== BREADCRUMBS?.length - 1 ? (
                      <svg
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                        className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'>
                        <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            <div className='mt-4'>
              <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                {product?.name}
              </h1>
            </div>
            {/* <Rating
                value={product.rating}
                text={`${product.numReviews} Reviews`}
              /> */}
            <div className="detailsBlock-2">
                {/* <Rating {...options} /> */}
                <span>({product?.numOfReviews} Reviews)</span>
              </div>
            <section className='mt-4'>
              <div className='flex items-center'>
                <p className='font-medium text-gray-900'>
                  R{product?.price}
                </p>

                <div className='ml-4 border-l text-muted-foreground border-gray-300 pl-4'>
                  {product?.in_stock ? "In stock" : "Not in stock"}
                </div>
              </div>

              <div className='mt-4 space-y-6'>
                <p className='text-base text-muted-foreground'>
                  {product?.description}
                </p>
              </div>

              <div className='mt-6 flex items-center'>
              <FaCheckCircle className='h-5 w-5 flex-shrink-0 text-green-500' />
                <p className='ml-2 text-sm text-muted-foreground'>
                  Eligible for instant delivery
                </p>
              </div>
              <div className='mt-6'>
                <div className='group inline-flex text-sm text-medium'>
                  <IoShieldCheckmarkSharp
                    className='mr-2 h-5 w-5 flex-shrink-0 text-gray-400'
                   />
                  <span className='text-muted-foreground hover:text-gray-700'>
                    30 Day Return Guarantee
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Product images */}
          <div className='mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center'>
            <div className='aspect-square rounded-lg'>
            <img className='-z-10 h-full w-full object-contain object-center'
              src={product?.imageUrl}
              alt='Product image'
              />
            </div>
          </div>

          {/* add to cart part */}
          <div className='mt-8 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start'>
            <div>
              <button className="flex items-center gap-4 justify-center rounded-md border border-gray-500 p-2 hover:bg-pink cursor-pointer duration-300" onClick={() => dispatch(addItem(product))}>
                <BiCartAdd size={25} />
                <p className='text-muted-foreground'>
                    Add to cart
                  </p>
              </button>
            </div>
          </div>
        </div>
      </div>
          {/* Reviews */}
          <div className="reviews__heading">
            <h1
              style={{
                padding: "5px 30px",
                opacity: 1,
                borderBottom: "1px solid #999",
                fontFamily: "Poppins,sans-serif",
              }}
            >
              Reviews
            </h1>
          </div>
          <div>
            {/* Reviews */}
            <div
              style={{
                padding: "1vmax",
              }}
            >
              {product?.reviews && product?.reviews ? (
                <div className="review__option">
                  {product.reviews &&
                    product.reviews.map((review) => (
                      {/* <ReviewCard review={review} /> */}
                    ))}
                </div>
              ) : (
                <p
                  className="noReviews"
                  style={{
                    fontFamily: "Poppins,sans-serif",
                  }}
                >
                  No Reviews Yet *
                </p>
              )}
              <div
                style={{
                  padding: "0px 2vmax",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontSize: "1.8vmax",
                    fontWeight: "700",
                    lineHeight: 1,
                    letterSpacing: "-.0125em",
                    color: "#222",
                    fontFamily: "Poppins,sans-serif",
                  }}
                >
                  Add a Review
                </span>
                <div
                  style={{
                    margin: "1vmax 0",
                    flexDirection: "column",
                    display: "flex",
                  }}
                >
                  <div>
                    <span
                      style={{
                        color: "#222",
                        fontFamily: "Poppins,sans-serif",
                        padding: "1vmax 0",
                      }}
                    >
                      Your Rating*
                    </span>
                    {/* <Rating
                      onChange={(e) => setRating(e.target.value)}
                      value={rating}
                      size="large"
                    /> */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    ></div>
                  </div>
                </div>
                <textarea
                  cols="30"
                  rows="6"
                  placeholder="Comment *"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{
                    maxWidth: "100%",
                    color: "#111",
                    borderColor: "#e1e1e1",
                    background: "#fff",
                    borderRadius: "0.3rem",
                    outline: "none",
                    padding: "5px",
                    fontSize: "1.2vmax",
                    lineHeight: "1.5",
                    resize: "none",
                    display: "block",
                  }}
                ></textarea>
                <button
                  type="submit"
                  style={{
                    width: "12vmax",
                    margin: "1vmax 0px",
                    fontFamily: "sans-serif",
                    padding: "10px 15px",
                    background: "#3BB77E",
                    border: "none",
                    cursor: "pointer",
                    color: "#fff",
                  }}
                  onClick={reviewSubmitHandler}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
    </MaxWidthWrapper>
  )
}

export default Product
