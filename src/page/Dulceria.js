import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { NavbarHeader } from "../components/NavbarHeader";

import imgEmpty from "../assets/imageAvailable.png";

import "./Dulceria.scss";

function Dulceria() {
  const [candystore, setCandystore] = React.useState();

  const url =
    "http://ec2-3-138-85-219.us-east-2.compute.amazonaws.com:8080/cp/v1/candystore";

  const fetchApi = async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("msg");
      const resJSON = await res.json();
      const data = resJSON.items;
      setCandystore(data);
    } catch (e) {
      console.log(e.message);
    }
  };

  React.useEffect(() => {
    fetchApi();
  }, []);

  console.log(candystore);

  return (
    <>
      <NavbarHeader />
      <Container as="section" className="pt-5">
        <Row>
          {candystore?.map((candy, index) => (
            <Col xs={3} key={index} className="mb-3">
              <Card className="card-dulceria">
                <Card.Img
                  className="card-dulceria__img"
                  variant="top"
                  src={candy.name}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = imgEmpty;
                  }}
                />
                <Card.Body className="card-dulceria__body">
                  <Card.Title className="card-dulceria__title">
                    {candy.description}
                  </Card.Title>
                  <span className="card-dulceria__price">S/ {candy.price}</span>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export { Dulceria };
