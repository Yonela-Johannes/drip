import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { setOrderInfo } from "../redux/features/order/orderSlice";
import { toast } from "react-toastify";
import { handleSignin } from "../redux/features/modals/modalsSlice";

const Cart = () =>
{
  const [primeShipping, setPrimeShipping] = useState(false);
  const { items } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.auth)
  const [cartProducts, setCartProducts] = useState();
  const [paymentMethod, setPaymentMethod] = useState()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() =>
  {
    setCartProducts(items)
    getTotalAmount()
  }, [items]);

  const getTotalAmount = () =>
  {
    if (cartProducts?.length > 0)
    {
      const totals = cartProducts?.map((prod) => Number(prod?.product?.total))?.reduce((acc, curr) => acc + curr);
      return totals
    }
  }

  useEffect(() =>
  {
    getTotalAmount()
  }, [cartProducts]);

  const handleCheckoutRedirect = () =>
  {
    if (!paymentMethod) return toast("Select payment method")
    const data = {
      products: cartProducts.map((product) =>
      {
        return product?.product
      }),

      user: {
        id: user?._id,
      },
      status: {
        paymentMethod,
      },
      paymentIntent: "",
      price: getTotalAmount() + (primeShipping ? 40 : 0),
      deliveryPrice: (primeShipping ? 40 : 0)
    };
    dispatch(setOrderInfo(data))
    navigate("/delivery");
  };

  return (
    <div className="flex flex-col mx-auto w-full max-w-screen-xl px-2.5 md:pt-12  overflow-hidden justify-start">
      <div className="px-10 py-10 ">
        {cartProducts?.length > 0 && (
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl ">
              <strong>Shopping Cart</strong>
            </h2>
          </div>
        )}
        {cartProducts?.length > 0 ? (
          <div className="flex flex-col sm:flex-row gap-10">
            <div className="w-3/4">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-5">
                  {cartProducts?.map((product, i) => (
                    <CartProduct key={`cart${i}`} cart={product} />
                  ))}
                </div>
              </div>
              <div className="flex gap-1 mt-10 justify-between items-center">
                <div>
                  <h4>
                    <strong>Choose Shipping</strong>
                  </h4>
                  <div className="flex  gap-5 mt-3">
                    <div className="flex">
                      <div className="flex items-center h-5 cursor-pointer">
                        <input
                          id="helper-radio"
                          aria-describedby="helper-radio-text"
                          type="radio"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 rounded-full dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          name="shipping-method"
                          onClick={() => setPrimeShipping(false)}
                          checked={!primeShipping}
                        />
                      </div>
                      <div className="ml-2 text-sm">
                        <label
                          htmlFor="helper-radio"
                          className="font-medium text-gray-900 dark:text-gray-500"
                        >
                          Free shipping
                        </label>
                        <p
                          id="helper-radio-text"
                          className="text-xs font-normal text-gray-500 dark:text-gray-500"
                        >
                          Expected delivery in 7 days
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex items-center h-5 cursor-pointer">
                        <input
                          id="helper-radio2"
                          aria-describedby="helper-radio-text"
                          type="radio"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 rounded-full dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          name="shipping-method"
                          onClick={() => setPrimeShipping(true)}
                          checked={primeShipping}
                        />
                      </div>
                      <div className="ml-2 text-sm">
                        <label
                          htmlFor="helper-radio2"
                          className="font-medium text-gray-900 dark:text-gray-500"
                        >
                          Prime Delivery (R40 Extra)
                        </label>
                        <p
                          id="helper-radio-text"
                          className="text-xs font-normal text-gray-500 dark:text-gray-500"
                        >
                          Expected delivery in 2 days
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <h4>Subtotal ({items?.length || 0} items):</h4>
                  <h4>
                    <strong>R{getTotalAmount() || 0}</strong>
                  </h4>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-gray-100 p-10 h-max">
              {user && (
                <h5>
                  <strong>{user?.name}, the last step remains!</strong>
                </h5>
              )}
              <div className="flex flex-col gap-2 my-5">
                <div className="flex">
                  <div className="flex items-center h-5 cursor-pointer">
                    <input
                      aria-describedby="payment-method-text"
                      type="radio"
                      value="debit"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 rounded-full dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      name="payment-method"
                      onClick={(e) => setPaymentMethod(e.target.value)}
                    />
                  </div>
                  <div className="ml-2 text-sm">
                    <label
                      htmlFor="debit"
                      className="font-medium text-gray-900 dark:text-gray-500"
                    >
                      Debit card
                    </label>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex items-center h-5 cursor-pointer">
                    <input
                      aria-describedby="payment-method-text"
                      type="radio"
                      value="paypal"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 rounded-full dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      name="payment-method"
                      onClick={(e) => setPaymentMethod(e.target.value)}
                    />
                  </div>
                  <div className="ml-2 text-sm">
                    <label
                      htmlFor="paypal"
                      className="font-medium text-gray-900 dark:text-gray-500"
                    >
                      Paypal
                    </label>
                  </div>
                </div>
                <div className="flex ">
                  <div className="flex items-center h-5 cursor-pointer">
                    <input
                      aria-describedby="payment-method-text"
                      type="radio"
                      value="cod"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-500 focus:ring-blue-500 rounded-full dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      name="payment-method"
                      onClick={(e) => setPaymentMethod(e.target.value)}
                    />
                  </div>
                  <div className="ml-2 text-sm">
                    <label
                      htmlFor="cod"
                      className="font-medium text-gray-900 dark:text-gray-500"
                    >
                      Cash on Delivery
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex text-sm flex-col gap-1 my-5">
                <div className="flex gap-3 justify-between">
                  <p>Subtotal ({items.length || 0} items):</p>
                  <p>
                    R{getTotalAmount()}
                  </p>
                </div>
                <div className="flex gap-3 justify-between">
                  <p>Delivery ({primeShipping ? "Prime" : "Free"}):</p>
                  <p className="font-semibold text-sm">
                    R{primeShipping ? "40" : "0"}
                  </p>
                </div>
                <div className="flex gap-3 justify-between">
                  <p>Total:</p>
                  <p className="font-semibold text-sm">
                    R{getTotalAmount() + (primeShipping ? 40 : 0)}
                  </p>
                </div>
              </div>
              {user?._id ? (
                <button
                  className="bg-amazon-secondary hover:bg-amazon-primary transition-all duration-300 text-black rounded flex justify-between px-3 py-2 gap-10 font-bold w-full"
                  onClick={() => handleCheckoutRedirect()}
                >
                  <span>Checkout</span>

                  <span> R{getTotalAmount() + (primeShipping ? 40 : 0)}</span>
                </button>
              ) : (
                <button
                  className="bg-gray-300 hover:bg-gray-400 transition-all duration-300 text-black rounded flex justify-center px-3 py-2 gap-10 font-bold w-full items-center"
                  onClick={() => dispatch(handleSignin())}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center flex-col gap-2 md:gap-6 justify-center h-[50vh] text-4xl bg-amazon-background font-bold">
            <p className="text-xl md:text-2xl text-black">Cart is Empty.</p>
            <p className="text-base md:text-xl text-black rounded-md px-2 cursor-pointer hover:text-pink2 duration-200 bg-pink1">
              <Link to="/products">Go to shop</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
