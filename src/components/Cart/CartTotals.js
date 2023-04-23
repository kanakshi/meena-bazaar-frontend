import React from "react";

export default function CartTotals(props) {
  const { totalPrice } = props;
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
            <button
              className="btn btn-outline-success text-uppercase mb-3 px-5"
              type="button"
              data-toggle="modal"
              data-target="#checkoutModal"
              id="loginNav"
              //   onClick={() => {
              //     clearCart();
              //   }}
            >
              Checkout
            </button>

            <h5>
              <span className="text-title">Total Price:</span>
              <strong>{totalPrice} /-</strong>
            </h5>
            <h5>
              <span className="text-title">Tax (GST):</span>
              <strong>{(totalPrice * 0.2).toFixed(0)} /-</strong>
            </h5>
            <h5>
              <span className="text-title">Final Price:</span>
              <strong>{(totalPrice * 0.2 + totalPrice).toFixed(0)} /-</strong>
            </h5>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
