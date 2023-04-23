import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Cart from "./components/Cart";
import Default from "./components/Default";
import AddProduct from "./components/AddProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import LoginModal from "./components/LoginModal";
import SignUpModal from "./components/SignUpModal";
import Orders from "./components/Orders";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(undefined);

  useEffect(() => {
    let user = localStorage.getItem("user");
    let _isLoggedIn = localStorage.getItem("isLoggedIn");
    if (user && _isLoggedIn) {
      setUserDetails(JSON.parse(user));
      setIsLoggedIn(JSON.parse(_isLoggedIn));
    }
  }, []);

  return (
    <React.Fragment>
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userDetails={userDetails}
        setUserDetails={setUserDetails}
      />
      <Switch>
        <Route exact path="/" component={ProductList} />
        <Route path="/details/:id" component={Details} />
        <Route path="/cart" component={Cart} />
        <Route path="/orders" component={Orders} />
        <Route path="/add-product" component={AddProduct} />
        <Route component={Default} />
      </Switch>
      <LoginModal
        setIsLoggedIn={setIsLoggedIn}
        setUserDetails={setUserDetails}
      />
      <SignUpModal />
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
