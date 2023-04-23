import React from "react";
import { deleteItemFromCartApi, updateCartApi } from "../../apis";

export default function CartItem({ item, getCartDetails }) {
  const { _id, name, image_url, price, quantity } = item;
  const updateCart = (qty) => {
    if(qty === 0){
        deleteItem();
        return;
    }
    updateCartApi(
      { id: _id, quantity: qty },
      () => {
        getCartDetails();
      },
      () => {}
    );
  };

  const deleteItem = () => {
    deleteItemFromCartApi(
      _id,
      (res) => {
        getCartDetails();
      },
      () => {}
    );
  };

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
      <div className="col-10 mx-auto col-lg-2 my-2 my-lg-2-0">
        <div className="d-flex justify-content-center">
          <div>
            <span
              onClick={() => updateCart(quantity - 1)}
              className="btn btn-black mx-1"
            >
              -
            </span>
            <span className="btn btn-black mx-1">{quantity}</span>
            <span
              onClick={() => updateCart(quantity + 1)}
              className="btn btn-black mx-1"
            >
              +
            </span>
          </div>
        </div>
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <div onClick={deleteItem} className="cart-icon">
          <i className="fas fa-trash"></i>
        </div>
      </div>
      <div className="col-10 mx-auto col-lg-2 text-right">
        <strong>item total : {price * quantity} /-</strong>
      </div>
    </div>
  );
}
