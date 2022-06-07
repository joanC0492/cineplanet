import React from "react";
import { Alert, Button, Col, Form } from "react-bootstrap";
import { useAuth } from "../context/useAuthContext";
import { Link, useNavigate } from "react-router-dom";

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

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (e) {
      console.log("error", e.message);
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

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="d-flex">
          <Col xs={12} sm={6} lg={4} xl={3} xxl={2} className="mx-auto mt-5">
            {!!error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3">
              <h1 className="h1 text-center mb-3">Iniciar sesion</h1>
              <Form.Control
                value={user.email}
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                placeholder="Ingrese usuario..."
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                value={user.password}
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                placeholder="Ingrese password..."
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <div className="d-flex align-items-center justify-content-between">
                <Button variant="primary" type="submit" className="me-3">
                  Acceder
                </Button>
                <Button onClick={handleResetPassword} variant="light">
                  Olvidaste tu contraseña?
                </Button>
              </div>
            </Form.Group>
            <div>
              <p>
                No tienes cuenta? <Link to="/register">Registrate</Link>
              </p>
              <Button
                onClick={handleGoogleSignIn}
                variant="info"
                type="button"
                className="w-100">
                Google Login
              </Button>
            </div>
          </Col>
        </div>
      </Form>
    </>
  );
}
// onClick={() => navigate(-1)}
export { Login };
