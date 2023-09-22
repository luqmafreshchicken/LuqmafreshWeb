import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import "./sendrating.css";

export default function SendRating({
  open,
  handleClose,
  onclick,
  onchange,
  value,
  ratingShow,
  onchange1,
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Box className="rating-container">
          <div className="rating_heading">
            <h5>Rating</h5>
            <Stack spacing={1}>
              <Rating
                name="size-medium"
                defaultValue={ratingShow}
                style={{ fontSize: "25px", color: "#ff0040", gap: "0.2rem" }}
                onChange={onchange1}
              />
            </Stack>
          </div>
          <div className="rating_text_btn">
            <textarea
              placeholder="Type message"
              rows="5"
              onChange={onchange}
              value={value}
            />
            <div className="submit_rating_btn" onClick={onclick}>
              Submit
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
