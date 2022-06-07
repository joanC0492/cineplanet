import React from "react";
import { Button, Card } from "react-bootstrap";

import imgEmpty from "../../assets/imageAvailable.png";

function CardDulceria({ candy, handleDataStore }) {
  const [cantidad, setCantidad] = React.useState(0);

  const handleChangeCantidad = (cantidad) => {
    setCantidad(cantidad);
    handleDataStore(+(cantidad * candy.price).toFixed(2), cantidad);
  };

  return (
    <Card className={`card-dulceria ${cantidad > 0 ? "active" : ""}`}>
      <div className="card-dulceria__figure">
        <Card.Img
          className="card-dulceria__img"
          variant="top"
          src={candy.name}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = imgEmpty;
          }}
        />
      </div>
      <Card.Body className="card-dulceria__body">
        <Card.Title className="card-dulceria__title">
          {candy.description}
        </Card.Title>
        <hr />
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <Button
              disabled={cantidad > 0 ? false : true}
              onClick={() => handleChangeCantidad(cantidad - 1)}
              style={{ backgroundColor: "#041E41" }}>
              <i className="fa-solid fa-minus"></i>
            </Button>
            <span className="d-inline-block px-3">{cantidad}</span>
            <Button
              onClick={() => handleChangeCantidad(cantidad + 1)}
              style={{ backgroundColor: "#041E41" }}>
              <i className="fa-solid fa-plus"></i>
            </Button>
          </div>
          <span className="card-dulceria__price">S/ {candy.price}</span>
        </div>
      </Card.Body>
    </Card>
  );
}

export { CardDulceria };
