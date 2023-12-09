import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FromContainer from "../../components/shared/FromContainer";
import CheckoutStep from "../../components/shared/CheckoutStep";
import { setAddressInfo } from "../../redux/features/order/orderSlice";
import { useNavigate } from "react-router-dom";

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address);
  const [city, setCity] = useState(shippingAddress?.city);
  const [postalcode, setPostalcode] = useState(shippingAddress?.postalcode);
  const [town, setTown] = useState(shippingAddress?.town);
  const [phone, setPhone] = useState(shippingAddress?.town);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setAddressInfo({ address, city, postalcode, town }));
    navigate("/order");
  };

  return (
    <div>
      <CheckoutStep step1 step2 />
      <FromContainer>
        <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="town">
            <Form.Label>Town</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter town"
              value={town}
              onChange={(e) => setTown(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="postalcode">
            <Form.Label>PostalCode</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter postal code"
              value={postalcode}
              onChange={(e) => setPostalcode(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            continue
          </Button>
        </Form>
      </FromContainer>
    </div>
  );
};

export default ShippingScreen;
