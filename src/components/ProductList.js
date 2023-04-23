import React, { useCallback, useEffect, useState } from "react";
import Product from "./Product";
import { getProductsApi } from "../apis";
import "./productList.css";

const ProductList = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchProducts = useCallback(() => {
    getProductsApi(
      (response) => {
        if (response) {
          setProducts(response.data);
        }
      },
      () => {}
    );
  }, []);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(()=> {
    if(selectedFilter === 'all'){
      setFilteredProducts(products);
    }else{
      setFilteredProducts(products.filter((product)=> product.type === selectedFilter))
    }
  }, [selectedFilter, products])
  return (
    <React.Fragment>
      <div style={{minHeight:"100vh"}} className="py-5">
        <div className="container">
          {/* <Title name="our" title="products"/> */}
          <div className="d-flex flex-row justify-content-center">
            <h4
              onClick={() => {
                setSelectedFilter("all");
              }}
              style={{ cursor: "pointer" }}
              className={`ml-5 text ${
                selectedFilter === "all" ? "selected" : ""
              }`}
            >
              All
            </h4>
            <h4
              onClick={() => {
                setSelectedFilter("jewellery");
              }}
              style={{ cursor: "pointer" }}
              className={`ml-5 ${
                selectedFilter === "jewellery" ? "selected" : ""
              }`}
            >
              Jewellery
            </h4>
            <h4
              onClick={() => {
                setSelectedFilter("bag");
              }}
              style={{ cursor: "pointer" }}
              className={`ml-5 ${selectedFilter === "bag" ? "selected" : ""}`}
            >
              Bags
            </h4>
          </div>
          <div className="row">
            {filteredProducts.map((product) => {
              return <Product key={product.id} product={product} />;
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductList;
