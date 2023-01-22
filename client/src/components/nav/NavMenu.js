import { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { getCookie, clearLogin } from "../../util/cookies";
import "./NavMenu.css";

const { Link } = Nav;
const { Brand, Toggle, Collapse } = Navbar;
function NavMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(getCookie("loginInfo") ? true : false);

  const logOff = () => {
    clearLogin();
    setIsLoggedIn(false);
    if (window.location.href.includes("/account")) {
      document.body.style.cursor = "wait";
      window.location.href = "/";
    }
  };

  return (
    <header className="App-header">
      <Navbar expand="lg">
        <Brand href="#">Mango</Brand>
        <Toggle aria-controls="basic-navbar-nav" />
        <Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link href="/">Home</Link>
            <Link href="/chart">Charts</Link>
            {isLoggedIn ? (
              <>
                <Link onClick={logOff}>Logout</Link>
                <Link href="/account">Account</Link>
              </>
            ) : (
              <Link href="/login">Login</Link>
            )}
            <Link href="/test">Testing</Link>
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
}

export default NavMenu;
