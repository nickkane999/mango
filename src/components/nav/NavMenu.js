import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './NavMenu.css';

function NavMenu() {
  return (
    <header className="App-header">
      <Navbar expand="lg">
        <Navbar.Brand href="#">Mango</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/chart">Chart</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default NavMenu;
