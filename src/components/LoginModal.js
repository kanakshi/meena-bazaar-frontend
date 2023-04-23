import React, { useState } from "react";
import { authApi } from "../apis";

const LoginModal = (props) => {
  const { setIsLoggedIn, setUserDetails } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  const validate = () => {
    let isValid = true;
    let _error = {
      titleError: "",
      descriptionError: "",
    };
    if (email.trim().length === 0) {
      isValid = false;
      _error = { ..._error, emailError: "Field cannot be empty!" };
    } else if (!email.includes("@") || !email.includes(".")) {
      isValid = false;
      _error = { ..._error, emailError: "Please enter a valid email!" };
    }
    if (password.trim().length === 0) {
      isValid = false;
      _error = { ..._error, passwordError: "Field cannot be empty!" };
    }
    setErrors(_error);
    return isValid;
  };

  const onLogin = () => {
    if (validate()) {
      authApi(
        {
          email,
          password,
        },
        (data) => {
          let element = document.getElementById("loginNav");
          if (element) {
            element.click();
          }
          setIsLoggedIn(true);
          setUserDetails(data.data.user);
          localStorage.setItem("isLoggedIn", JSON.stringify(true));
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("user", JSON.stringify(data.data.user));
        },
        (error) => {}
      );
    }
  };
  return (
    <div
      class="modal fade"
      id="loginModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="loginModalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content login-modal-bg">
          <div class="modal-body w-100">
            <h2 className="text-center text-white">Login</h2>
            <div class="input-group flex-nowrap mt-2">
              <div class="input-group-prepend">
                <span class="input-group-text" id="addon-wrapping">
                  <i class="fas fa-envelope"></i>
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, emailError: "" });
                }}
                value={email}
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
            <div className="w-100 d-flex justify-content-center">
              <button
                style={{
                  backgroundColor: "#B7B3EC",
                  fontWeight: "bold",
                  color: "white",
                }}
                onClick={onLogin}
                type="button"
                class="btn w-50 mt-5 mx-auto "
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
