import React, { useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import { RootContext } from "./context";
import logo from "./logo.png";

export default function Topbar() {
  const { user } = useContext(RootContext);

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Link to="/" className="navbar-brand">
          <img
            src={logo}
            width="32"
            height="32"
            className="d-inline-block align-top mr-2"
            alt="Fooda logo"
          />
          Fooda
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {user.anonymous || (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link className="nav-link" to="/restaurants">
                Restaurants
              </Link>
              <Link className="nav-link" to="/orders">
                My Orders
              </Link>
            </Nav>
          </Navbar.Collapse>
        )}
        <Navbar.Collapse className="justify-content-end">
          {user.anonymous ? (
            <Nav>
              <Link className="nav-link" to="/login">
                Login
              </Link>
              <Link className="nav-link" to="/signup">
                Signup
              </Link>
            </Nav>
          ) : (
            <Nav>
              <Navbar.Text className="text-white mr-2">
                Hello {user.first_name}!
              </Navbar.Text>
              <Link className="nav-link" to="/login">
                Logout
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
