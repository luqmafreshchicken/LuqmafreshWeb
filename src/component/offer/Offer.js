import React, { useEffect, useState } from "react";
import "./Offer.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { getAllCoupon } from "../../serverRequest/Index";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css/navigation";
import Font from "../../utils/Font";

const Offer = () => {
  const [open, setOpen] = useState(false);
  const [coupon, setCoupon] = useState([]);
  // const [couponModal, setCouponModal] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function getData() {
      const newData = await getAllCoupon();
      setCoupon(newData.data);
    }
    getData();
  }, []);

  return (
    <div className="main_offer">
      <div className="submain_offer">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          className="mySwiper"
        >
          {coupon.map((data) => (
            <SwiperSlide className="coupon_container">
              <h1>
                {data.discount}% CASHBACK
                <span>
                  Above ₹{data.applyAmount} | NEW 50 {data.couponCode}{" "}
                </span>
              </h1>
              <span onClick={handleOpen}>
                <button>KNOW MORE</button>
              </span>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {coupon.map((modal) => (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="new_more_modal">
            <div className="coupon_code">
              <h6>{modal.couponCode}</h6>
            </div>
            <div className="coupon_apply_amount">
              <p>
                Apply Amount <span>₹{modal.applyAmount}</span>
              </p>
            </div>
            <div className="coupon_apply_amount">
              <p>
                Discount:{" "}
                <span style={{ color: "yellowgreen" }}>{modal.discount}%</span>
              </p>
            </div>
            <div className="coupon_apply_amount">
              <p>
                ExpiryDate: <span>{modal.expiryDate}</span>
              </p>
            </div>
            <div className="coupon_discription">
              <h6>Discription</h6>
            </div>

            <div className="discription_01">
              <p>{modal.description1}</p>
            </div>
            <div className="discription_01">
              <p>{modal.description2}</p>
            </div>
            <div className="discription_01">
              <p> {modal.description3}.</p>
            </div>
            <div className="discription_01">
              <p>{modal.description4}.</p>
            </div>
            <div className="discription_01">
              <p> {modal.description5}.</p>
            </div>
          </Box>
        </Modal>
      ))}
    </div>
  );
};

export default Offer;
