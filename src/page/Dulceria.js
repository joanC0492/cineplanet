import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavbarHeader } from "../components/NavbarHeader";
import { CardDulceria } from "../components/CardDulceria";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./Dulceria.scss";

function Dulceria() {
  const [candystore, setCandystore] = React.useState();
  const [dataStore, setDataStore] = React.useState({
    subTotal: [],
    cantidad: [],
  });
  const [total, setTotal] = React.useState(0);
  const [cantidad, setCantidad] = React.useState(0);

  const sumItems = (arr, dec) => {
    return arr
      .filter((item) => (!item ? 0 : item))
      .reduce((aux, item) => aux + item, 0)
      .toFixed(dec);
  };

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

  const handleDataStore = (subTotalItem, index, amountAll, amountItem) => {
    let arrTotal = new Array(amountAll);
    let arrCantidad = new Array(amountAll);

    arrTotal = dataStore.subTotal.length !== 0 ? dataStore.subTotal : arrTotal;
    arrCantidad =
      dataStore.cantidad.length !== 0 ? dataStore.cantidad : arrCantidad;
    arrTotal.splice(index, 1, subTotalItem);
    arrCantidad.splice(index, 1, amountItem);

    setDataStore({ subTotal: arrTotal, cantidad: arrCantidad });
  };

  React.useEffect(() => {
    fetchApi();
  }, []);

  React.useEffect(() => {
    console.log("dataStore", dataStore);
    setTotal(sumItems(dataStore.subTotal, 2));
    setCantidad(sumItems(dataStore.cantidad, 0));
  }, [dataStore]);

  return (
    <>
      <NavbarHeader />
      <Container as="section" className="py-5">
        <Row>
          {!candystore && (
            <div className="vh-100 d-flex align-items-center justify-content-center">
              <i className="fa-solid fa-spinner fa-spin fa-5x"></i>
            </div>
          )}
          {!candystore && (
            <div className="vh-100 d-flex align-items-center justify-content-center">
              <i className="fa-solid fa-spinner fa-spin fa-5x"></i>
            </div>
          )}

          {!!candystore && (
            <>
              <h1 className="h1" style={{ color: "#041E41" }}>
                Dulcería
              </h1>
              {candystore?.map((candy, index) => (
                <Col xs={12} sm={6} md={4} xxl={3} key={index} className="mb-3">
                  <CardDulceria
                    candy={candy}
                    handleDataStore={(subTotalItem, amountItem) =>
                      handleDataStore(
                        subTotalItem,
                        index,
                        candystore?.length,
                        amountItem
                      )
                    }
                  />
                </Col>
              ))}

              <Col
                xs={12}
                md={{ span: 6, offset: 6 }}
                lg={{ span: 4, offset: 8 }}
                className="total-productos mt-3 mt-md-5">
                <Table striped>
                  <tbody>
                    <tr>
                      <td>Cantidad:</td>
                      <td>{cantidad}</td>
                    </tr>
                    <tr>
                      <td>Total:</td>
                      <td>{total}</td>
                    </tr>
                  </tbody>
                </Table>
                <div className="text-end">
                  <Button>Continuar</Button>
                </div>
              </Col>
            </>
          )}
        </Row>
      </Container>
    </>
  );
}

export { Dulceria };
