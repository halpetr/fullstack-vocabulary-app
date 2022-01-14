import React, { useState } from 'react';
import { Nav, Button, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BiCog } from 'react-icons/bi';

function Navigation(props) {
  return (
    <Navbar collapseOnSelect expand="sm" variant="dark" id="navbar">
      <Container id="nav-container">
        <Nav.Link as={Link} to="/">
          <Navbar.Brand id="navbrand"> Learn Words! </Navbar.Brand>
        </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar" />
        <Navbar.Collapse id="basic-navbar">
          <Nav variant="pills" id="nav">
            <Nav.Link
              className="mt-2"
              id="button"
              as={Link}
              to="/"
              eventKey={1}
            >
              Type a word
            </Nav.Link>
            <Nav.Link
              className="mt-2"
              id="button"
              as={Link}
              to="/admin"
              eventKey={2}
            >
              <BiCog style={{ fontSize: '150%' }} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
