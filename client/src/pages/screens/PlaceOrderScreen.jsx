import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { createOrder } from "../../redux/features/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/shared/Message";
import CheckOutStep from "../../components/shared/CheckoutStep";

const PlaceOrderScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { items, orderDetails, user } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

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

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart?.cartItems,
        shippingAddress: cart?.shippingAddress,
        paymentMethod: cart?.paymentMethod,
        itemsPrice: cart?.itemsPrice,
        shippingPrice: cart?.shippingPrice,
        taxPrice: cart?.taxPrice,
        totalPrice: cart?.totalPrice,
      })
    );
  };

  const total = (price, item) => {
    return Number(price) * Number(item)
  }

  return (
    <>
      <CheckOutStep step1 step2 step3 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address :</strong>
                {orderDetails?.deliveryAddress?.address}&nbsp;
                {orderDetails?.deliveryAddress?.city}&nbsp;
                {orderDetails?.deliveryAddress?.country}&nbsp;
                {orderDetails?.deliveryAddress?.postalcode}&nbsp;
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p className="capitalize">
                <strong>{orderDetails?.status?.paymentMode}</strong>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {items?.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {items?.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item?.product?.imageUrl} alt={item?.product?.name} fluid />
                        </Col>
                        <Col>
                          <Link to={`/product/${item?.product?._id}`}>
                            {item?.product?.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item?.product?.quantity} X R{item?.product?.price} = R {total(item?.product?.price, item?.product?.quantity)}
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
                  <Col>R{orderDetails?.price}</Col>
                </Row>
                <Row>
                  {/* <Col>Shipping</Col> */}
                  {/* <Col>R{cart?.shippingPrice}</Col> */}
                </Row>
                <Row>
                  {/* <Col>Tax</Col> */}
                  {/* <Col>R{cart?.taxPrice}</Col> */}
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>R{orderDetails?.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {/* {error && <Message variant="danger">{error}</Message>} */}
              </ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cart?.cartItems === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
