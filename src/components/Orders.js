import React, { useEffect, useState } from "react";
import { deleteOrderApi, getOrdersApi } from "../apis";
import Title from "./Title";

const EmptyOrders = () => {
  return (
    <div style={{ minHeight: "100vh" }} className="container mt-5">
      <div className="row">
        <div className="col-10 mx-auto text-center text-title">
          <h1>You don't have any orders yet !</h1>
        </div>
      </div>
    </div>
  );
};

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = () => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      getOrdersApi(
        user._id,
        (res) => {
          console.log(res.data);
          setOrders(res.data);
        },
        () => {}
      );
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const deleteOrder = (id) => {
    deleteOrderApi(
      id,
      (res) => {
        getOrders();
      },
      () => {}
    );
  };

  console.log(orders);
  return (
    <section>
      {orders && orders.length > 0 ? (
        <div style={{ minHeight: "100vh" }}>
          <Title name="My" title="Orders" />
          {orders.map((_order) => {
            return (
              <div className="row mt-3 justify-content-center">
                <div
                  style={{
                    backgroundColor: "#fff",
                    minHeight: "100px",
                    width: "90%",
                  }}
                  className="p-2"
                >
                  <div className="d-flex flex-row w-100 mb-5 justify-content-between">
                    <span> Shipping Address: {_order.address} </span>
                    <div
                      onClick={() => {
                        deleteOrder(_order._id);
                      }}
                      className="cart-icon"
                    >
                      <i className="fas fa-trash"></i>
                    </div>
                  </div>
                  {_order.items.map((item) => {
                    const { image_url, name, price, quantity } = item;
                    return (
                      <div className="row my-2 text-capitalize text-center">
                        <div className="col-10 mx-auto col-lg-2">
                          <img
                            src={image_url}
                            style={{ width: "5rem", height: "5rem" }}
                            className="img-fluid"
                            alt="product"
                          />
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
                          <span className="d-lg-none">product : </span>
                          {name}
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
                          <span className="d-lg-none">price : </span>
                          {price}
                        </div>
                        <div className="col-10 mx-auto col-lg-1 my-2 my-lg-2-0">
                          <div className="d-flex justify-content-center">
                            <div>
                              <span className="mx-1">{quantity}</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-10 mx-auto col-lg-3 text-right">
                          <strong>item total : {price * quantity} /-</strong>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {/* <CartColumns /> */}
          {/* <CartList getCartDetails={getCartDetails} cart={cart} /> */}
        </div>
      ) : (
        <EmptyOrders />
      )}
    </section>
  );
};

export default Orders;
