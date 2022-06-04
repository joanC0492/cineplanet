import React from "react";
import { Alert, Button, Col, Form } from "react-bootstrap";
import {useAuth} from "../context/useAuthContext";
import {Link, useNavigate} from 'react-router-dom';

function Register() {
  const [user, setUser] = React.useState({ email: "", password: "" });
  const [error,setError] = React.useState("");

  const {signUp} = useAuth();
  const navigate = useNavigate();
  
  const handleChange = ({target:{name,value}}) =>{
    setUser({...user,[name]:value});
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signUp(user.email,user.password); // peticion asincrona, toda llamada al backend es asincrona
      setError("");
      navigate('/'); // redirecciona al home si no hay error
    } catch (e) {
      // error.code - es unico
      console.error("e.code",e.code);
      console.error("e.message",e.message);
      if (e.code === "auth/invalid-email") {
        setError("Correo Invalido");
      }else if(e.code === "auth/weak-password"){
        setError("La contraseña debe tener al menos 6 caracteres");
      }else{
        setError(e.message);
      }
    }
  };
  
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="flex">
          <Col xs={12} lg={5} xl={3} className="mx-auto mt-5">
            {!!error && (
              <Alert variant='danger'>
                {error}
              </Alert>
            )}
            <Form.Group className="mb-3">
              <h1 className="h1 text-center">Registrate</h1>
              <Form.Control
                value={user.email}
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                placeholder="Ingrese usuario..."
                required
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
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Button variant="primary" type="submit">
                Registrarse
              </Button>
            </Form.Group>
            <div className="text-end">
              <Link to="/login">Login</Link>
            </div>
          </Col>
        </div>
      </Form>
    </>
  );
}

export { Register };
