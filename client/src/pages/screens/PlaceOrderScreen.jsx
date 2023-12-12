import React, { useEffect } from "react";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { createOrder, getOrderDetails, resetOrderInfo } from "../../redux/features/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/shared/Message";
import CheckOutStep from "../../components/shared/CheckoutStep";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import { getAddress } from "../../redux/features/address/addressSlice";
import Button from "../../components/button/Button";
import { toast } from "react-toastify";
import { clearCart } from "../../redux/features/cart/cartSlice";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { address, isLoading } = useSelector((state) => state.address);
  const { user, orderDetails } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const getCurrentUserAddress = async () => {
    if(user && user?._id){
      await dispatch(getAddress(user?._id))
    }
  }

  useEffect(() => {
    getCurrentUserAddress()
  }, [])

  useEffect(() => {
    if(!orderDetails){
      navigate('/products')
    }
  }, []);

  //fun for decimal
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  cart.itemsPrice = addDecimal(
    cart.cartItems?.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimal(cart?.cartItems > 500 ? 0 : 50);
  cart.taxPrice = addDecimal(Number((0.15 * cart?.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart?.itemsPrice) +
    Number(cart?.shippingPrice) +
    Number(cart?.taxPrice)
  ).toFixed(2);

  const placeOrderHandler = async () => {
    if(!orderDetails) {
      toast("Required details missing")
      setTimeout(() => {
        navigate('/cart')
      }, 100);
    }
    const response = await dispatch(
      createOrder(orderDetails)
    );
    console.log(response?.payload?.success === true)
    if(response?.payload?.success === true){
      dispatch(resetOrderInfo())
      dispatch(getOrderDetails())
      toast("Payment successful")
      dispatch(clearCart())
      navigate('/success')
    }else{
      toast('Something went wrong. Please contact the manager.')
    }
  };

  const total = (price, item) => {
    return Number(price) * Number(item)
  }

  return (
    <MaxWidthWrapper>
      <CheckOutStep step1 step2 step3 />
      <div className="flex flex-col md:flex-row gap-6 px-6 mx-auto lg:py-10 py-4">
        <Row >
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Address :</strong>
                  {address?.address?.street}&nbsp;
                  {address?.address?.city}&nbsp;
                  {address?.address?.country}&nbsp;
                  {address?.address?.postalCode}&nbsp;
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p className="capitalize">
                  <strong>{orderDetails?.order?.status?.paymentMethod}</strong>
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Items</h2>
                {orderDetails && orderDetails?.order && orderDetails?.order?.products?.length === 0 ? (
                  <Message>Your Cart is Empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {orderDetails?.order?.products?.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={2}>
                            <Image src={item?.imageUrl} alt={item?.product?.name} fluid />
                          </Col>
                          <Col>
                            <Link to={`/product/${item?._id}`}>
                              {item?.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item?.quantity} X R{item?.price} = R {total(item?.price, item?.quantity)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>R{orderDetails?.order?.price}</Col>
                  </Row>
                  <Row>
                    <Col>Delivery</Col>
                    <Col>R{orderDetails?.order?.deliveryPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Total</Col>
                    <Col>R{orderDetails?.order?.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {/* {error && <Message variant="danger">{error}</Message>} */}
                </ListGroup.Item>
                <div className="" onClick={placeOrderHandler}>
                  <Button text="Place order"/>
                </div>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
    </MaxWidthWrapper>
  );
};

export default PlaceOrderScreen;
