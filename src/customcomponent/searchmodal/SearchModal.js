import React from "react";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";

import Modal from "@mui/material/Modal";
import "./searchmodal.css";

const SearchModal = ({
  searchOpen,
  handleSearchClose,
  onclick,
  image,
  name,
  description,
  description1,
  description2,
  description3,
  qty,
  unit,
  price,
  ogp,
  discount,
}) => {
  const [show, setShow] = useState(false);
  const [incre, setIncre] = useState(1);

  const increment = () => {
    setIncre(incre + 1);
  };
  const decrement = () => {
    if (incre > 1) {
      setIncre(incre - 1);
    } else {
      setIncre(1);
    }
  };
  return (
    <div>
      <Modal
        open={searchOpen}
        onClose={handleSearchClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="search_modal">
          <img
            src="cross.png"
            style={{
              position: "absolute",
              top: "1rem",
              right: "1.5rem",
              cursor: "pointer",
            }}
            onClick={onclick}
          />

          <div className="search_modal_image_container">
            <img src={image} />
          </div>
          <div className="search_modal_content_container">
            <h4>{name}</h4>
            <p>{description}</p>
            <hr style={{ height: "1px" }} />

            <p>{description1}</p>
            <p>{description2}</p>
            <p>{description3}</p>
            <p>
              Quantity :{" "}
              <span>
                {qty} {unit}
              </span>
            </p>
            <di className="cardfull_detail_text">
              <div className="cardfull_detail_container_text">
                <p style={{ color: "#d11243" }}>₹{price}</p>
                <p style={{ color: "grey", textDecoration: "line-through" }}>
                  MRP: ₹{ogp}
                </p>
                <p style={{ color: "green" }}>{discount}% OFF</p>
              </div>
              {show === false ? (
                <div className="Add_to_cart_btn">
                  <button
                    onClick={() => {
                      setShow(!show);
                      // AddToCart()
                    }}
                  >
                    ADD
                  </button>
                </div>
              ) : (
                <div
                  hidden={!show}
                  // onClick={() => AddToCart()}
                  className="full_view_incre_btn"
                >
                  <p onClick={decrement}>-</p>
                  <p>{incre}</p>
                  <p onClick={increment}>+</p>
                </div>
              )}
            </di>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SearchModal;
