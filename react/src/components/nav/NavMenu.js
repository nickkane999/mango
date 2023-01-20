import { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { getCookie, clearLogin } from "../../util/cookies";
import "./NavMenu.css";

const { Link } = Nav;
const { Brand, Toggle, Collapse } = Navbar;
function NavMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(getCookie("loginInfo") ? true : false);

  /*
  useEffect(() => {
    console.log("My login status is here");
    console.log(isLoggedIn);
  }, [isLoggedIn]);
  */

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
            <NavDropdown title="Charts" id="basic-nav-dropdown">
              <NavDropdown.Item href="/chart/d3">Chart D3</NavDropdown.Item>
              <NavDropdown.Item href="/chart/chartist">Chart Chartist</NavDropdown.Item>
            </NavDropdown>
            {/* <Link href="/chart/d3">Chart D3</Link> */}
            {isLoggedIn ? (
              <>
                <Link onClick={logOff}>Logout</Link>
                <Link href="/account">Account</Link>
              </>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
}

export default NavMenu;
