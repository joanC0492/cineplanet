import React from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useAuth } from "../context/useAuthContext";
import { Link, useNavigate } from "react-router-dom";

import logoGoogle from "../assets/icon-google.svg";

import "./Login.scss";

function Login() {
  const [user, setUser] = React.useState({ email: "", password: "" });
  const [error, setError] = React.useState("");

  const { login, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(user.email, user.password); // peticion asincrona, toda llamada al backend es asincrona
      setError("");
      navigate("/"); // redirecciona al home si no hay error
    } catch (e) {
      // error.code - es unico
      console.error("e.code", e.code);
      console.error("e.message", e.message);
      if (e.code === "auth/invalid-email") {
        setError("Correo Invalido");
      } else if (e.code === "auth/weak-password") {
        setError("La contraseña debe tener al menos 6 caracteres");
      } else {
        setError(e.message);
      }
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (!user.email) return setError("Por favor ingrese su Email");
    try {
      await resetPassword(user.email);
      setError(
        "Te enviamos un enlace a tu correo para restablecer tu contraseña"
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      localStorage.setItem("SHOW_MODAL_LOGIN", 1);
      navigate("/inicio");
    } catch (e) {
      console.log("error", e.message);
      setError(e.message);
    }
  };

  return (
    <div className="login">
      <div className="position-fixed top-0 start-0 p-3">
        <Button
          onClick={() => navigate(-1)}
          style={{
            background: "transparent",
            borderColor: "transparent",
          }}>
          <i className="fa-solid fa-angle-left"></i>
          <span className="d-inline-block ms-2">Atras</span>
        </Button>
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
                <Button variant="light" className="w-100 mt-3 login__btn">
                  Ingresar como Invitado
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
