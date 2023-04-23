import React, { useEffect, useState } from "react";
import Title from "../Title";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import CartList from "./CartList";
import CartTotals from "./CartTotals";
import { getCartApi } from "../../apis";
import CheckoutModal from "../CheckoutModal";

const Store = (props) => {
  const [cart, setCart] = useState([]);

  const getCartDetails = () => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      getCartApi(
        user._id,
        (res) => {
          console.log(res.data);
          setCart(res.data);
        },
        () => {}
      );
    }
  };

  useEffect(() => {
    getCartDetails();
  }, []);

  const getTotalPrice = () => {
    let total_price = 0;
    cart.map((item) => {
      total_price = total_price + +item.price * item.quantity;
      return total_price
    });
    return total_price;
  };

  return (
    <section>
      {cart.length > 0 ? (
        <div style={{ minHeight: "100vh" }}>
          <Title name="My" title="cart" />
          <CartColumns />
          <CartList getCartDetails={getCartDetails} cart={cart} />
          <CartTotals totalPrice={getTotalPrice()} history={props.history} />
        </div>
      ) : (
        <EmptyCart />
      )}
      <CheckoutModal onSuccess={getCartDetails} />
    </section>
  );
};

export default Store;
