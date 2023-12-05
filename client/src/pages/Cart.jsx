import React, { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import MaxWidthWrapper from "../components/MaxWidthWrapper";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [primeShipping, setPrimeShipping] = useState(false);
  const [isCod, setIsCod] = useState(false);
  const { items } = useSelector((state) => state.cart)
  const [cartProducts, setCartProducts] = useState();
  const userInfo = {}
  // const navigate = useNavigation();

  useEffect(() => {
    setCartProducts(items)
    getTotalAmount()
  }, [items]);

  const getTotalAmount = () => {
    if(cartProducts?.length > 0) return cartProducts?.map((prod) => prod?.product?.total)?.reduce((acc, curr) => acc + curr)
  }

  useEffect(() => {
    getTotalAmount()
  }, [cartProducts]);

  const handleCheckoutRedirect = () => {
    const data = {
      products: {
        connect: products.map((product) => {
          return { id: product.id };
        }),
      },

      user: {
        id: userInfo.id,
      },
      status: {
        paymentMode: isCod ? "cash-on-delivery" : "stripe",
      },
      paymentIntent: "",
      price: getTotalAmount() + (primeShipping ? 40 : 0),
    };
    setOrdersInfo(data);
    // navigate("/checkout");
  };

  return (
    <MaxWidthWrapper>
      <div className="px-10 py-10 ">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl text-amazon-dark">
          <strong>Shopping Cart</strong>
        </h2>
      </div>
        {cartProducts?.length ? (
          <div className="flex flex-col sm:flex-row gap-10">
            <div className="w-3/4">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-5">
                  {cartProducts?.map((product) => (
                    <CartProduct key={product?._id} cart={product} />
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
                      <div className="flex items-center h-5">
                        <input
                          id="helper-radio"
                          aria-describedby="helper-radio-text"
                          type="radio"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                      <div className="flex items-center h-5">
                        <input
                          id="helper-radio2"
                          aria-describedby="helper-radio-text"
                          type="radio"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
              <h5>
                <strong>Kishan, the last step remains!</strong>
              </h5>
              <div className="flex flex-col gap-2 my-5">
                <div className="flex">
                  <div className="flex items-center h-5">
                    <input
                      id="stripe"
                      aria-describedby="payment-method-text"
                      type="radio"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      name="payment-method"
                      onClick={() => setIsCod(false)}
                      checked={!isCod}
                    />
                  </div>
                  <div className="ml-2 text-sm">
                    <label
                      htmlFor="stripe"
                      className="font-medium text-gray-900 dark:text-gray-500"
                    >
                      Stripe
                    </label>
                  </div>
                </div>
                <div className="flex ">
                  <div className="flex items-center h-5">
                    <input
                      id="cod"
                      aria-describedby="payment-method-text"
                      type="radio"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-500 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      name="payment-method"
                      onClick={() => setIsCod(true)}
                      checked={isCod}
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
              {userInfo ? (
                <button
                  className="bg-amazon-secondary hover:bg-amazon-primary transition-all duration-300 text-black rounded flex justify-between px-3 py-2 gap-10 font-bold w-full"
                  onClick={() => handleCheckoutRedirect()}
                >
                  <span>Checkout</span>

                  <span> R{getTotalAmount() + (primeShipping ? 40 : 0)}</span>
                </button>
              ) : (
                <button
                  className="bg-amazon-secondary hover:bg-amazon-primary transition-all duration-300 text-white rounded flex justify-center px-3 py-2 gap-10 font-bold w-full items-center"
                  // onClick={() => navigate.push("/login")}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-6 justify-center h-[50vh] text-4xl bg-amazon-background font-bold">
            <div>Cart is Empty</div>
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default Cart;
