import React from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { useAuth } from "../context/useAuthContext";
import { Link, useNavigate } from "react-router-dom";

import logoGoogle from "../assets/icon-google.svg";

import "./Login.scss";

function Login() {
  const [error, setError] = React.useState("");

  const { loginWithGoogle, loginInvitado, logoutInvitado } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      localStorage.setItem("SHOW_MODAL_LOGIN", 1);
      logoutInvitado();
      navigate("/");
    } catch (e) {
      console.log("error", e.message);
      setError(e.message);
    }
  };

  const handleInvitadoSignIn = () => {
    loginInvitado();
    navigate("/");
  };

  return (
    <div className="login">
      <div className="position-fixed top-0 start-0 p-3">
        <Link to="/">
          <Button
            style={{
              background: "transparent",
              borderColor: "transparent",
            }}>
            <i className="fa-solid fa-angle-left"></i>
            <span className="d-inline-block ms-2">Atras</span>
          </Button>
        </Link>
      </div>
      <Container as="section" className="py-5 vh-100">
        <Row className="h-100">
          <Col xs={12} xl={4} className="mx-auto align-self-center pb-5">
            {!!error && <Alert variant="danger">{error}</Alert>}
            <div className="shadow-lg py-5 mb-5 bg-body rounded login__card">
              <h1 className="h1 text-center mb-4 login__title">
                Iniciar sesión
              </h1>
              <div
                className="d-flex flex-wrap align-items-center justify-content-center mx-auto"
                style={{ maxWidth: "240px" }}>
                <Button
                  onClick={handleGoogleSignIn}
                  variant="light"
                  type="button"
                  className="w-100 login__btn">
                  <div className="d-flex align-items-center">
                    <img src={logoGoogle} alt="Google Logo" />
                    <span className="d-inline-block ms-3">
                      Continuar con Google
                    </span>
                  </div>
                </Button>
                <Button
                  onClick={handleInvitadoSignIn}
                  variant="light"
                  className="w-100 mt-3 login__btn">
                  <div className="d-flex align-items-center">
                    <img
                      src="https://icons-for-free.com/iconfiles/png/512/customer+customers+filled+person+profile+user+icon-1320184293054755190.png"
                      alt="invitado"
                      width="18"
                    />
                    <span className="d-inline-block ms-3">
                      Ingresar como Invitado
                    </span>
                  </div>
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export { Login };
