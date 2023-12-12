import MaxWidthWrapper from '../components/MaxWidthWrapper'
import { product_categories } from '../config'
import { useEffect, useState } from 'react'
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom'
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/features/cart/cartSlice';
import { BiCartAdd } from "react-icons/bi";
import { createComment, createReview, getProduct } from '../redux/features/products/productSlice';
import Rating from '../components/shared/Rating'
import ReviewCard from '../components/Products/ReviewCard'
import { toast } from 'react-toastify';
import CommentCard from '../components/Products/CommentCard';

const BREADCRUMBS = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Products', href: '/products' },
]
const Product = () => {
  const {user } = useSelector((state) => state.auth)
  const { item } = useSelector((state) => state.products);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [review, setReview] = useState('')
  const [view, setView] = useState('reviews')
  const params = useParams()
  const {id} = params;
  const dispatch = useDispatch()


  const fetchProduct = () => {
    if(id){
      dispatch(getProduct(id))
    }
  }

  useEffect(() => {
    fetchProduct()
  }, []);

  const reviewSubmitHandler = (e) => {
    if(review < 10) return toast('Comment too short')
    if(!user && !user?._id) return toast('Missing data to make a comment')
    dispatch(createReview({
      userId: user?._id,
      comment: review,
      productId: item?.product?._id,
      rating,
    })
    )
    setTimeout(() => {
      fetchProduct();
    }, 100)
    setReview('')
    setRating(0)
  };

  const commentHandler = () => {
    if(comment.length < 10) return toast('Comment too short')
    if(!user && !user?._id) return toast('Missing data to make a comment')
    dispatch(createComment({
      userId: user?._id,
      comment,
      productId: item?.product?._id,
    })
    )
    setTimeout(() => {
      fetchProduct()
    }, 100)
    setComment('')
  }

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
              <h1 className='text-lg font-bold tracking-tight text-gray-900 sm:text-4xl'>
                {item?.product?.name}
              </h1>
            </div>
            <Rating
                value={item?.product?.ratings || 0}
                text={`${item?.product?.numOfReviews } Reviews`}
              />
            <div className="detailsBlock-2">
                <span>({item?.product?.numOfReviews || 0} Reviews)</span>
              </div>
            <section className='mt-4'>
              <div className='flex items-center'>
                <div className='ml-4 border-l text-muted-foreground border-gray-300 pl-4'>
                  R{item?.product?.price}
                </div>

                <div className='ml-4 border-l text-muted-foreground border-gray-300 pl-4'>
                  {item?.product?.inStock ? "In stock" : "Not in stock"}
                </div>
                <div className='ml-4 border-l text-muted-foreground border-gray-300 pl-4'>
                  {item?.product?.category?.title}
                </div>
              </div>

              <div className='mt-4 space-y-6'>
                <p className='text-base text-muted-foreground'>
                  {item?.product?.description}
                </p>
              </div>

              <div className='mt-6 flex items-center'>
                <div className='group inline-flex text-sm text-medium'>
                  <FaCheckCircle className='h-5 w-5 flex-shrink-0 text-green-500' />
                  <p className='ml-2 text-sm text-muted-foreground'>
                    Eligible for delivery within 2 weeks
                  </p>
                </div>
              </div>
              <div className='mt-6 flex items-center'>
                <div className='group flex items-center text-sm text-medium'>
                  <IoShieldCheckmarkSharp className='mr-2 h-5 w-5 flex-shrink-0 text-gray-400'
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
              src={item?.product?.imageUrl}
              alt='Product image'
              />
            </div>
          </div>

          {/* add to cart part */}
          <div className='mt-8 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start'>
            <div>
              <button className="flex items-center gap-4 justify-center rounded-md border border-gray-500 p-2 hover:bg-pink cursor-pointer duration-300" onClick={() => dispatch(addItem(item?.product))}>
                <BiCartAdd  className='mr-2 h-5 w-5 flex-shrink-0 text-gray-400' size={25} />
              </button>
            </div>
          </div>
        </div>
      </div>
          {/* Reviews */}
          <div className="flex gap-4">
            <h1 onClick={() => setView('comments')} className={`${view == "comments" ? "bg-pink rounded-md" : ""} font-medium text-sm text-muted-foreground hover:text-gray-900 cursor-pointer`}
            >
              Comments
            </h1> /
            <h1 onClick={() => setView('reviews')} className={`${view == "reviews" ? "bg-pink rounded-md" : ""} font-medium text-sm text-muted-foreground hover:text-gray-900 cursor-pointer`}
            >
              Reviews
            </h1>
          </div>
          {view === 'reviews' ? (
            <div>
              {/* Reviews */}
              <div className='py-4'>
                {item?.product && item?.product?.reviews?.length ? (
                  <div className="review__option pb-4">
                    {item?.product?.reviews &&
                      item?.product?.reviews.map((review, i) => (
                        <ReviewCard key={i} review={review} />
                      ))}
                  </div>
                ) : (
                  <p
                  >
                    No reviews yet
                  </p>
                )}
                {!item?.product?.reviews?.map(review => review?.user?._id)?.includes(user?._id) && (
                  <>
                    {user && user?._id && (
                      <div
                        style={{
                          padding: "0px 2vmax",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "18px",
                            lineHeight: 1,
                            letterSpacing: "-.0125em",
                            color: "#222",
                            fontFamily: "Poppins,sans-serif",
                          }}
                        >
                          Review
                        </span>
                        <div
                        >
                          <div>
                            <span
                            >
                              Rate
                            </span>
                            <Rating
                              setRating={setRating}
                              rating={rating}
                              view={true}
                              select={true}
                              hover={true}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            ></div>
                          </div>
                        </div>
                        <textarea
                          cols="20"
                          rows="4"
                          placeholder="Comment"
                          value={review}
                          onChange={(e) => setReview(e.target.value)}
                          style={{
                            maxWidth: "100%",
                            color: "#111",
                            borderColor: "#e1e1e1",
                            background: "#fff",
                            borderRadius: "0.3rem",
                            outline: "none",
                            padding: "5px",
                            fontSize: "18px",
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
                            background: "gray",
                            border: "none",
                            cursor: "pointer",
                            color: "#fff",
                          }}
                          onClick={reviewSubmitHandler}
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ): view === 'comments' && (
            <div>
              {/* Comments */}
              <div className='py-4'>
                {item?.product && item?.product?.comments?.length ? (
                  <div className="review__option">
                    {item?.product.comments &&
                      item?.product.comments.map((comment) => (
                        <CommentCard comment={comment} />
                      ))}
                  </div>
                ) : (
                  <p
                  >
                    No comments yet
                  </p>
                )}
                {user && user?._id && (
                  <div
                    style={{
                      padding: "0px 2vmax",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "16px",
                        lineHeight: 1,
                        letterSpacing: "-.0125em",
                        color: "#222",
                        fontFamily: "Poppins,sans-serif",
                      }}
                    >
                      Comment
                    </span>
                    <textarea
                      cols="20"
                      rows="4"
                      placeholder="What's on your mind?"
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
                        fontSize: "16px",
                        resize: "none",
                        display: "block",
                      }}
                    ></textarea>
                    <button onClick={commentHandler}
                      style={{
                        width: "12vmax",
                        margin: "1vmax 0px",
                        fontFamily: "sans-serif",
                        padding: "10px 15px",
                        background: "pink",
                        border: "none",
                        cursor: "pointer",
                        color: "black",
                      }}
                    >
                      Comment
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
    </MaxWidthWrapper>
  )
}

export default Product
