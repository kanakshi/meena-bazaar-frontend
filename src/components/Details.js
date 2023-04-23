import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";
import { toast } from "react-toastify";
import { addToCartApi, getCartApi, getProductsByIdApi } from "../apis";
import { useHistory } from "react-router-dom";

const Details = (props) => {
  const id = props.match.params && props.match.params.id;
  const history = useHistory();
  const [productDetails, setProductDetails] = useState(undefined);
  const [cart, setCart] = useState(undefined);

  const getCartDetails = () => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      getCartApi(
        user._id,
        (res) => {
          setCart(res.data);
        },
        () => {}
      );
    }
  };

  const addToCart = () => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      const data = {
        user_id: user._id,
        item_id: id,
        quantity: 1,
        name: productDetails.title,
        image_url: productDetails.image_url,
        price: productDetails.price,
      };
      addToCartApi(
        data,
        (res) => {
          toast.success("Item added to cart successfully !");
          getCartDetails();
        },
        () => {}
      );
    } else {
    }
  };

  const checkIfAvailableInCart = (prodId) => {
    const isAvailable = cart && cart.find((ele) => ele.item_id === prodId);
    if (isAvailable) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    getCartDetails();
    getProductsByIdApi(
      id,
      (res) => {
        setProductDetails(res.data);
      },
      () => {}
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ minHeight: "100vh" }} className="container py-5">
      {/*title*/}
      <div className="row>">
        <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
          <h1>{productDetails && productDetails.title}</h1>
        </div>
      </div>
      {/*end of title*/}
      {/*product info*/}
      <div className="row">
        <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
          <img
            src={productDetails && productDetails.image_url}
            className="img-fluid"
            alt="product"
          />
        </div>
        {/*product text*/}
        <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
          <h2>Item: {productDetails && productDetails.title}</h2>
          <h4 className="text-blue">
            <strong>
              Price : {productDetails && productDetails.price} <span>/-</span>
            </strong>
          </h4>
          {productDetails && productDetails.quantity && (
            <h6 className="text-blue">
              <strong>
                Hurry only {productDetails && productDetails.quantity}{" "}
                <span>Pcs. are left!</span>
              </strong>
            </h6>
          )}

          <p className="text-capitalize font-weight-bold mt-3 mb-0">
            some info about {productDetails && productDetails.title}
          </p>
          <p className="text-muted lead">
            {productDetails && productDetails.description}
          </p>
          <div>
            <Link to="/">
              <ButtonContainer>back to products</ButtonContainer>
            </Link>
            <ButtonContainer
              cart
              onClick={
                checkIfAvailableInCart(id)
                  ? () => {
                      history.push("/cart");
                    }
                  : addToCart
              }
            >
              {checkIfAvailableInCart(id) ? "inCart" : "add to cart"}
            </ButtonContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Details;
