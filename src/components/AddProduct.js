import React, { useState } from "react";
import "./AddProduct.css";
import { useContentLogic } from "../hooks";
import { createProductApi } from "../apis";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("bag");
  const [errors, setErrors] = useState({
    imageError: "",
    titleError: "",
    descriptionError: "",
    priceError: "",
    quantityError: "",
    typeError: "",
  });

  const { uploadImageToS3Bucket } = useContentLogic();
  const history = useHistory();

  const validate = () => {
    let isValid = true;
    let _errors = {
      imageError: "",
      titleError: "",
      descriptionError: "",
      priceError: "",
      quantityError: "",
      typeError: "",
    };
    if (selectedImage === "") {
      isValid = false;
      _errors = {
        ..._errors,
        imageError: "Please select an image to continue.",
      };
    }
    if (title.trim() === "") {
      isValid = false;
      _errors = { ..._errors, titleError: "Field cannot be empty" };
    }
    if (description.trim() === "") {
      isValid = false;
      _errors = { ..._errors, descriptionError: "Field cannot be empty" };
    }
    if (price.trim() === "") {
      isValid = false;
      _errors = { ..._errors, priceError: "Field cannot be empty" };
    }
    if (quantity.trim() === "") {
      isValid = false;
      _errors = { ..._errors, quantityError: "Field cannot be empty" };
    }

    setErrors(_errors);
    return isValid;
  };

  const AddProduct = () => {
    if (validate()) {
      let data = {
        title,
        description,
        image_url: selectedImage,
        price,
        quantity,
        type,
      };
      createProductApi(
        data,
        (res) => {
          toast.success("Product added sucessfully!");
          history.push("/");
        },
        () => {}
      );
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center py-5"
      style={{ minHeight: "100vh" }}
    >
      <div className="row w-100 justify-content-center pl-2 pr-2">
        <div className="card col-sm-10 col-md-8 col-lg-6 ">
          <h2 className="text-center">Add New Product</h2>

          <div className="row justify-content-center">
            {isImageLoading ? (
              <div>Loading...</div>
            ) : (
              <div className="d-flex flex-column">
                <img
                  src={
                    selectedImage
                      ? selectedImage
                      : "https://imgv3.fotor.com/images/homepage-feature-card/Upload-an-image.jpg"
                  }
                  alt="img"
                  className="mt-2"
                  style={{
                    height: 200,
                    width: 200,
                    borderRadius: 100,
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setErrors({ ...errors, imageError: "" });
                    let imageUploader = document.getElementById(
                      "product_image_uploader"
                    );
                    if (imageUploader) {
                      imageUploader.click();
                    }
                  }}
                />
                <span className="text-center mt-2 font-weight-bold">
                  Upload image{" "}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#ee1919",
                    fontWeight: "bold",
                  }}
                >
                  {errors.imageError}
                </span>
              </div>
            )}

            <div className="row">
              <input
                onChange={(event) => {
                  setIsImageLoading(true);
                  uploadImageToS3Bucket(
                    event.target.files[0],
                    (data) => {
                      setSelectedImage(data);
                      setIsImageLoading(false);
                    },
                    () => {
                      setIsImageLoading(false);
                    }
                  );
                }}
                type={"file"}
                ccept="image/*"
                style={{ display: "none" }}
                id="product_image_uploader"
              />
            </div>
          </div>
          <input
            type="text"
            class="form-control mt-4"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors({ ...errors, titleError: "" });
            }}
            aria-label="title"
            aria-describedby="addon-wrapping"
          />
          <span
            style={{
              fontSize: "14px",
              color: "#ee1919",
              fontWeight: "bold",
            }}
          >
            {errors.titleError}
          </span>
          <input
            type="number"
            class="form-control mt-4"
            placeholder="Price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              setErrors({ ...errors, priceError: "" });
            }}
            aria-label="price"
            aria-describedby="addon-wrapping"
          />
          <span
            style={{
              fontSize: "14px",
              color: "#ee1919",
              fontWeight: "bold",
            }}
          >
            {errors.priceError}
          </span>
          <input
            type="number"
            class="form-control mt-4"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
              setErrors({ ...errors, quantityError: "" });
            }}
            aria-label="quantity"
            aria-describedby="addon-wrapping"
          />
          <span
            style={{
              fontSize: "14px",
              color: "#ee1919",
              fontWeight: "bold",
            }}
          >
            {errors.quantityError}
          </span>
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
            class="custom-select mt-4"
          >
            <option disabled>Please select type</option>
            <option value="bag">Bag</option>
            <option value="jewellery">Jewellery</option>
          </select>
          <textarea
            class="form-control mt-4"
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors({ ...errors, descriptionError: "" });
            }}
            aria-label="description"
            aria-describedby="addon-wrapping"
          />
          <span
            style={{
              fontSize: "14px",
              color: "#ee1919",
              fontWeight: "bold",
            }}
          >
            {errors.descriptionError}
          </span>
          <div className="w-100 d-flex justify-content-center">
            <button
              onClick={AddProduct}
              style={{
                backgroundColor: "#B7B3EC",
                fontWeight: "bold",
                color: "white",
              }}
              type="button"
              class="btn w-50 mt-5 mx-auto "
            >
              Create Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
