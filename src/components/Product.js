import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Product = (props) => {
  const { _id, title, image_url, price } = props.product;
  return (
    <ProducrWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
      <div className="card">
        <div className="img-container">
          <Link to={`/details/${_id}`}>
            <img src={image_url} alt="product" className="card-img-top" />
          </Link>
          {/* <button className="cart-btn" disabled={inCart ? true : false}
                                onClick={() => {
                                    value.addToCart(id);
                                    value.openModal(id);
                                }}>
                                {inCart ? (<p className="text-capitalize mb-0" disabled>{""}in Cart</p>)
                                    : (<i className="fas fa-cart-plus" />)}
                            </button> */}
        </div>

        <div className="card-footer d-flex justify-content-between">
          <p
            style={{
              maxWidth: "70%",
              width: "60%",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
            className="align-self-center mb-0"
          >
            {title}
          </p>
          <h6 className="text-blue font-italic mb-0">{`${price} /-`}</h6>
        </div>
      </div>
    </ProducrWrapper>
  );
};
Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    img: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    inCart: PropTypes.bool,
  }).isRequired,
};

export default Product;
const ProducrWrapper = styled.div`
.card{
    border-color:tranparent;
    transition:all 1s linear;
    background-color: #ffffff38;
    box-shadow: 0px 0px 5px #00000054;
    max-height: 320px;
    min-height: 320px;
    height: 320px;
    display: flex;
    justify-content: space-between;
    padding: 0;
}
.card-footer{
    background:rgba(247,247,247);
    border-top:transparent;
    transition:all 1s linear;
}
&:hover{
    .card{
        border:0.04rem solid rgba(0,0,0,0.2);
        box-shadow:2px 2px 5px 0px rgba(0,0,0,0.2);
    }
    .card-footer{
        background:rgba(247,247,247);
    }
}
.img-container{
    position:relative;
    overflow:hidden;
    height: 100%
}
.card-img-top{
     transition:all 1s linear;
     height:100%
     object-fit: cover;
     width: 100%;
    //  height: 100px;
}
.img-container:hover .card-img-top{
    transform:scale(1.2);
}
.cart-btn{
    position:absolute;
    bottom:0;
    right:0;
    padding:0.2rem 0.4rem;
    background:var(--lightBlue);
    color:var(--mainWhite);
    font-size:1.4rem;
    border-radius:0.5 rem 0 0 0;
    transform:translate(100%, 100%);
    transition:all 1s linear;
}
.img-container:hover .cart-btn{
    transform:translate(0, 0);
}
.cart-btn:hover{
    color:var(--mainBlue);
    cursor:pointer;
}
`;
