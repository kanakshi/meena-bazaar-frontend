import React, { useState } from "react";
import { registerApi } from "../apis";
import {toast} from "react-toastify";

const SignUpModal = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const [errors, setErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  const validate = () => {
    let isValid = true;
    let _errors = {
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      phoneError: "",
      passwordError: "",
      confirmPasswordError: "",
      countryError: "",
      franchiseError: "",
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
    if (email === "") {
      isValid = false;
      _errors = { ..._errors, emailError: "Field cannot be empty" };
    } else if (!emailRegex.test(email)) {
      isValid = false;
      _errors = { ..._errors, emailError: "Please enter a valid Email" };
    }
    if (password === "") {
      isValid = false;
      _errors = { ..._errors, passwordError: "Field cannot be empty" };
    } else if (password.length < 8) {
      isValid = false;
      _errors = {
        ..._errors,
        passwordError: "Password must contain atleast 8 characters",
      };
    }
    if (confirmPassword === "") {
      isValid = false;
      _errors = { ..._errors, confirmPasswordError: "Field cannot be empty" };
    } else if (confirmPassword !== password) {
      isValid = false;
      _errors = { ..._errors, confirmPasswordError: "Password does not match" };
    }
    setErrors(_errors);
    return isValid;
  };

  const onSignUp = ()=> {
    if(validate()){
      registerApi(
        {
          email,
          password,
          firstName,
          lastName,
          isAdmin: false,
        },
        (data) => {
          let element = document.getElementById("signUpNav");
           toast.success("User registered successfully, Please login to continue!")
          if (element) {
            element.click();
          }
        },
        (error) => {
          console.log(error);
          toast.error()
        }
      );
    }
  }

  return (
    <div
      class="modal fade"
      id="registerModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="registerModalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content login-modal-bg">
          <div class="modal-body w-100">
            <h2 className="text-center text-white">Sign Up</h2>
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
              <div class="input-group-prepend">
                <span class="input-group-text" id="addon-wrapping">
                  <i class="fas fa-envelope"></i>
                </span>
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, emailError: "" });
                }}
                class="form-control"
                placeholder="Email"
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
              {errors.emailError}
            </span>
            <div class="input-group flex-nowrap mt-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="addon-wrapping">
                  <i class="fas fa-lock"></i>
                </span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, passwordError: "" });
                }}
                class="form-control"
                placeholder="Password"
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
              {errors.passwordError}
            </span>
            <div class="input-group flex-nowrap mt-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="addon-wrapping">
                  <i class="fas fa-lock"></i>
                </span>
              </div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors({ ...errors, confirmPasswordError: "" });
                }}
                class="form-control"
                placeholder="Confirm Password"
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
              {errors.confirmPasswordError}
            </span>
            <div className="w-100 d-flex justify-content-center">
              <button
                style={{
                  backgroundColor: "#B7B3EC",
                  fontWeight: "bold",
                  color: "white",
                }}
                onClick={onSignUp}
                type="button"
                class="btn w-50 mt-5 mx-auto "
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
