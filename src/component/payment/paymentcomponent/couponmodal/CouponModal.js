import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Scrollbars } from "react-custom-scrollbars";
import "./couponmodal.css";
import {
  Show_Cart,
  applyCoupon,
  getAllCoupon,
  getUserID,
} from "../../../../serverRequest/Index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export default function CouponModal({
  open,
  handleClose,
  handleApplyCoupon = () => {},
}) {
  const [showText, setShowText] = React.useState(false);
  const [coupon, setCoupon] = useState([])

  React.useEffect(() => {
    async function getData() {
      const newData = await getAllCoupon();
      setCoupon(newData.data);
    }
    getData();
  }, []);

  const handleShow = () => {
    setShowText(!showText);
  };

  return (
    <div>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="coupon_modal">
          {/* apply coupon heading */}
          <div className="apply_coupon">
            <h5>Apply Coupon</h5>
          </div>
          {/* end apply coupon heading */}
          {/* avialable_coupon */}

          <div className="avialable_coupon">
            <h6> {coupon.length} coupons</h6>
          </div>
          {/* end avialable_coupon */}

          {/* coupon_container_box */}
          <Scrollbars style={{ height: "76%" }} autoHide>
            {coupon.map((list) => (
              <div className="coupon_container_box">
                <div className="coupon_content_box">
                  <div className="coupon_offer_name">
                    {/* coupon_name */}
                    <div className="coupon_name">
                      <img src="coupon-combo.png" height="20px" width="20px" />
                      <p>{list.couponCode}</p>
                    </div>
                    {/* end coupon_name */}

                    {/* coupon_apply_text */}
                    <div className="coupon_apply_text">
                      <p onClick={() => handleApplyCoupon(list)}>Apply</p>
                    </div>
                    {/* end coupon_apply_text */}
                  </div>
                  {/* ************************ */}
                  {/* coupon_cashback */}
                  <div className="coupon_cashback">
                    <p>{list.description1}</p>
                  </div>
                  {/* end coupon_cashback */}
                  {/* coupon_orders */}
                  <div className="coupon_orders_text">
                    <p>{list.description2}</p>
                  </div>
                  {/* end coupon_orders */}
                  {/* term & condition */}
                  <div hidden={!showText}>
                    <div className="term_condition_heading">
                      <h6>Term & Condition</h6>
                    </div>
                    <div className="term_condition_text">
                      <p> {list.description3}</p>
                    </div>

                    <div className="term_condition_text">
                      <p>{list.description4}</p>
                    </div>

                    <div className="term_condition_text">
                      <p>{list.description5}</p>
                    </div>
                  </div>
                  {/* end term & condition */}
                  {showText == false ? (
                    <div className="view_details_button">
                      <p onClick={handleShow}>View Details</p>
                    </div>
                  ) : null}
                  {showText == true ? (
                    <div className="view_details_button">
                      <p onClick={handleShow}>Hide Details</p>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </Scrollbars>
          <div className="crossbtn" onClick={handleClose}>
            <img src="crossbtn.png" />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
