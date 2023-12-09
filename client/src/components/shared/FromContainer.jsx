import React from "react";

import { Container, Row, Col } from "react-bootstrap";

const FromContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justfy-content-md-center">
        <Col>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FromContainer;
