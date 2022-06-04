import React from 'react';
import {useAuth} from '../context/useAuthContext';
import {NavbarHeader} from '../components/NavbarHeader';
import { Col, Container, Row } from 'react-bootstrap';
// import {useNavigate} from 'react-router-dom';

function Home() {
  const {user,logout} = useAuth();
  // const [error,setError] = React.useState();

  // const navigate = useNavigate();

  const handleLogout = async ()=>{
    console.log("handleLogout");
    try {
      await logout(); // si devuelve una promesa significa que es asincrono
      // navigate("/login");
    } catch (e) {
      console.log(e.message);
      console.log(e.code);
    }
  }

  return (
    <>
      <NavbarHeader 
        userEmail={user.email}
        // handleLogout={handleLogout}
      />
      <Container as="section" className="py-5">
        <Row>
          <Col xs={12}>
            <p>Hola {user.displayName || user.email}</p>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export {Home};