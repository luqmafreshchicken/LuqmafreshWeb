import React from "react";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";

import Modal from "@mui/material/Modal";
import "./whistlist.css";

const SearchModal = ({ whistlistOpen, handlewhistlistClose, onclick }) => {
  return (
    <div>
      <Modal
        open={whistlistOpen}
        onClose={handlewhistlistClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="whist_list">
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

          <div className="whist_list_image_container">
           <img src="whist.png"/>
          </div>
          <div className="whist_list_content_container">
             <div className="whist_list_input_container">
             <h4>Sign In</h4>
                <input placeholder="Enter Email..."/>
                <input placeholder="Enter OTP..."/>
                <button>Proceed Via OTP</button>
             </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SearchModal;
