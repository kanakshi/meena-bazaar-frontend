import React from "react";
import { Link, useHistory } from "react-router-dom";
import LOGO_IMG from "../img/logo.png";
import "./navbar.css";

const Navbar = (props) => {
  const { isLoggedIn, setIsLoggedIn, setUserDetails, userDetails } = props;
  const history = useHistory();

  const onLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserDetails(undefined);
    history.push("/");
  };
  return (
    <>
      <nav
        style={{ backgroundColor: "#f8f9fa59", width: "100%", zIndex: 9999 }}
        className="navbar navbar-expand-lg navbar-light"
      >
        <Link className="navbar-brand" to="/">
          <img style={{ width: "150px" }} src={LOGO_IMG} alt="logo" />
        </Link>
        <div className="ml-auto">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {isLoggedIn && (
              <>
                <Link className="nav-link font-weight-bold" to="/cart">
                  My Cart
                </Link>
                <Link className="nav-link font-weight-bold" to="/orders">
                  My Orders
                </Link>
                {userDetails && userDetails.role  === "admin" && (
                  <Link className="nav-link font-weight-bold" to="/add-product">
                    Add Product
                  </Link>
                )}
                <div
                  onClick={onLogout}
                  style={{ cursor: "pointer" }}
                  className="nav-link text-danger cursor-pointer font-weight-bold"
                >
                  Logout
                </div>
              </>
            )}
            {!isLoggedIn && (
              <>
                <li className="nav-item cursor-pointer">
                  <div
                    style={{ cursor: "pointer" }}
                    data-toggle="modal"
                    data-target="#loginModal"
                    id="loginNav"
                    className="nav-link cursor-pointer font-weight-bold"
                  >
                    Login
                  </div>
                </li>
                <li className="nav-item cursor-pointer">
                  <div
                    style={{ cursor: "pointer" }}
                    data-toggle="modal"
                    id="signUpNav"
                    data-target="#registerModal"
                    className="nav-link cursor-pointer font-weight-bold"
                    href="#"
                  >
                    Sign Up
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};
// const NavWrapper = styled.nav`
//   background: transparent;
//   .nav-link {
//     color: var(--mainWhite) !important;
//     font-size: 1.3 rem;
//     text-transform: capitalize;
//   }
// `;

export default Navbar;
