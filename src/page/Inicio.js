import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NavbarHeader } from "../components/NavbarHeader";
import { useAuth } from "../context/useAuthContext";
import { Modal } from "../components/Modal";
import "./inicio.scss";

function getLocalStorage(itemName) {
  const itemLocalStorage = localStorage.getItem(itemName);
  let aux = 0;
  if (!!itemLocalStorage) {
    aux = itemLocalStorage;
    localStorage.setItem(itemName, 0);
  }
  return parseInt(aux);
}

function Inicio() {
  const [premieres, setPremieres] = React.useState();
  const [showModal, setShowModal] = React.useState(false);
  const { user } = useAuth();

  const url =
    "http://ec2-3-138-85-219.us-east-2.compute.amazonaws.com:8080/cp/v1/premieres";

  const fetchApi = async () => {
    try {
      const resp = await fetch(url);
      const respJSON = await resp.json();
      const data = respJSON.premieres;
      setPremieres(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  React.useEffect(() => {
    const aux = getLocalStorage("SHOW_MODAL_LOGIN");
    setShowModal(!!aux);
    fetchApi();
  }, []);
  
  return (
    <>
      <NavbarHeader />
      <Container as="section" className="my-5">
        <Row className="justify-content-center">
          <Col xs="12" lg="10" xl="12">
            <ul className="row list-unstyled list-premiere">
              {!premieres && (
                <div className="vh-100 d-flex align-items-center justify-content-center">
                  <i className="fa-solid fa-spinner fa-spin fa-5x"></i>
                </div>
              )}
              {!!premieres &&
                premieres.map((premiere, index) => (
                  <li
                    className="col-sm-6 col-xl-4 align-self-center mb-3 list-premiere__item"
                    key={index}>
                    <div className="d-flex align-items-center">
                      <Link
                        className="list-premiere__link"
                        to={`${user ? "/dulceria" : "/login"}`}>
                        <img
                          src={premiere.image}
                          alt={premiere.description}
                          className="list-premiere__img"
                        />
                      </Link>
                      <span className="h5 ms-2 mb-0 d-inline-block">
                        {premiere.description}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          </Col>
        </Row>
      </Container>

      {!!showModal && (
        <Modal>
          <div className="text-center modal-body">
            <div onClick={() => setShowModal(false)} className="modal-close">
              x
            </div>
            <p className="h3">Bienvenido {user?.displayName || user?.email}</p>
            <Link to="/dulceria">
              <Button>Aceptar</Button>
            </Link>
          </div>
        </Modal>
      )}
    </>
  );
}

export { Inicio };
