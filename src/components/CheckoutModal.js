import React, { useState } from "react";
import { checkoutCartApi } from "../apis";
import { toast } from "react-toastify";

const CheckoutModal = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    addressError: "",
  });

  const validate = () => {
    let isValid = true;
    let _errors = {
      firstNameError: "",
      lastNameError: "",
      addressError: "",
    };
    if (firstName === "") {
      isValid = false;
      _errors = { ..._errors, firstNameError: "Field cannot be empty" };
    } else if (firstName.length < 3) {
      isValid = false;
      _errors = { ..._errors, firstNameError: "Please enter a valid name" };
    }
    if (lastName === "") {
      isValid = false;
      _errors = { ..._errors, lastNameError: "Field cannot be empty" };
    } else if (lastName.length < 3) {
      isValid = false;
      _errors = { ..._errors, lastNameError: "Please enter a valid last name" };
    }
    if (address === "") {
      isValid = false;
      _errors = { ..._errors, addressError: "Field cannot be empty" };
    }
    setErrors(_errors);
    return isValid;
  };

  const onCheckout = () => {
    if (validate()) {
      let user = localStorage.getItem("user");
      if (user) {
        user = JSON.parse(user);
        checkoutCartApi(
          user._id,
          { address },
          (res) => {
            let element = document.getElementById("checkoutModal");
            if (element) {
              element.click();
            }
            if( res && res.data && res.data.msg){
                toast.success(res.data.msg)
                props.onSuccess();
            }
            console.log(res);
          },
          () => {}
        );
      }
    }
  };

  return (
    <div
      class="modal fade"
      id="checkoutModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="checkoutModalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content login-modal-bg">
          <div class="modal-body w-100">
            <h2 className="text-center text-white">Checkout</h2>
            <div class="input-group flex-nowrap mt-2">
              <div class="input-group-prepend">
                <span class="input-group-text" id="addon-wrapping">
                  <i class="fas fa-user"></i>
                </span>
              </div>
              <input
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setErrors({ ...errors, firstNameError: "" });
                }}
                class="form-control"
                placeholder="First Name"
                aria-label="firstname"
                aria-describedby="addon-wrapping"
              />
            </div>
            <span
              style={{
                fontSize: "14px",
                color: "#ee1919",
                fontWeight: "bold",
              }}
            >
              {errors.firstNameError}
            </span>
            <div class="input-group flex-nowrap mt-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="addon-wrapping">
                  <i class="fas fa-user"></i>
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setErrors({ ...errors, lastNameError: "" });
                }}
                placeholder="Last Name"
                aria-label="lastname"
                aria-describedby="addon-wrapping"
              />
            </div>
            <span
              style={{
                fontSize: "14px",
                color: "#ee1919",
                fontWeight: "bold",
              }}
            >
              {errors.lastNameError}
            </span>
            <div class="input-group flex-nowrap mt-3">
              <textarea
                type="text"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setErrors({ ...errors, addressError: "" });
                }}
                class="form-control"
                placeholder="Shipping Address"
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
            <span
              style={{
                fontSize: "14px",
                color: "#ee1919",
                fontWeight: "bold",
              }}
            >
              {errors.addressError}
            </span>

            <div className="w-100 d-flex justify-content-center">
              <button
                style={{
                  backgroundColor: "#B7B3EC",
                  fontWeight: "bold",
                  color: "white",
                }}
                onClick={onCheckout}
                type="button"
                class="btn w-50 mt-5 mx-auto "
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
