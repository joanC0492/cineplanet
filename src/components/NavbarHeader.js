import React from "react";
import logo from "../assets/logo.svg";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import "./NavbarHeader.scss";
import { useAuth } from "../context/useAuthContext";
import { useNavigate } from "react-router-dom";

function NavbarHeader() {
  const { user, logout } = useAuth();
  const { navigate } = useNavigate();

  const handleLogout = async () => {
    console.log("handleLogout");
    try {
      await logout(); // si devuelve una promesa significa que es asincrono
      // navigate("/login");
    } catch (e) {
      console.log(e.message);
      console.log(e.code);
    }
  };

  const links = [
    {
      name: "Inicio",
      route: "/",
    },
    {
      name: "Dulcería",
      route: "/register",
    },
  ];

  return (
    <header>
      <Navbar variant="dark" expand="lg" className="navbarheader">
        <Container>
          <Navbar.Brand>
            <NavLink to="/">
              <img src={logo} alt="logo cineplanet" />
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-lg-center" as="ul">
              {links.map((item, index) => (
                <Nav.Link as="li" key={index}>
                  <NavLink
                    to={item.route}
                    className={({ isActive }) =>
                      isActive
                        ? "navbarheader__link active"
                        : "navbarheader__link"
                    }>
                    {item.name}
                  </NavLink>
                </Nav.Link>
              ))}
              <Nav.Link as="li">{user?.email}</Nav.Link>
              <Nav.Link as="li">
                {!!user?.email ? (
                  <Button
                    className="px-4"
                    variant="light"
                    onClick={handleLogout}>
                    Salir
                  </Button>
                ) : (
                  <Link to="/login">
                    <Button className="px-3" variant="light">
                      Iniciar Sesión
                    </Button>
                  </Link>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export { NavbarHeader };
