import React from "react";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";

import Modal from "@mui/material/Modal";
import "./searchmodal.css";

const SearchModal = ({ searchOpen, handleSearchClose ,onclick}) => {
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
            style={{ position: "absolute", top: "1rem", right: "1.5rem", cursor:"pointer" }}
            onClick={onclick}
          />

          <div className="search_modal_image_container">
            <img src="FRESH BONELESS MUTTON.png" />
          </div>
          <div className="search_modal_content_container">
            <h4>Fresh Boneless Mutton</h4>
            <p>
              With precisely cut bite-sized pieces, it ensures even
              tenderization
            </p>
            <hr style={{ height: "1px" }} />

            <p>
              {" "}
              Mutton Boneless - Indulge in this extraordinary cut, meticulously
              crafted from the most succulent sections meticulously trimmed of
              excess fat.
            </p>
            <p>
              Once prepared, relish its exquisitely tender and velvety texture
              that imparts a luxurious flavor to your gravies.
            </p>
            <p>
              With precisely cut bite-sized pieces, it ensures even
              tenderization, perfect for creating mouthwatering pan-fried
              delicacies.
            </p>
            <p>
              Quantity : <span>500gms</span>
            </p>
            <di className="cardfull_detail_text">
              <div className="cardfull_detail_container_text">
                <p style={{ color: "#d11243" }}>₹900</p>
                <p style={{ color: "grey", textDecoration: "line-through" }}>
                  MRP: ₹1000
                </p>
                <p style={{ color: "green" }}>10% OFF</p>
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
