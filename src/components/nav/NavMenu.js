import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./NavMenu.css";

function NavMenu() {
  return (
    <header className="App-header">
      <Navbar expand="lg">
        <Navbar.Brand href="#">Mango</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Charts" id="basic-nav-dropdown">
              <NavDropdown.Item href="/chart/d3">Chart D3</NavDropdown.Item>
              <NavDropdown.Item href="/chart/chartist">Chart Chartist</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default NavMenu;
