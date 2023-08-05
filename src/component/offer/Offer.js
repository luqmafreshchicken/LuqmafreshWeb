import React, { useEffect, useState, useRef } from "react";
import "./Offer.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CountryDetail, GetCountry, getAllCoupon } from "../../serverRequest/Index";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import * as moment from "moment";



const Offer = () => {
  const [open, setOpen] = useState(false);
  const [coupon, setCoupon] = useState([]);
  const [country, setCountry] = useState("");
  const [countrycurrency, setCountryCurrency] = useState("");
  const [countrytitle, setCountryTitle] = useState("");
  const [flag, setFlag] = useState("");
  // const [couponModal, setCouponModal] = useState([]);

  const swiperNavPrevRef1 = useRef(null);
  const swiperNavNextRef1 = useRef(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function getData() {
      const newData = await getAllCoupon();
      setCoupon(newData.data);
    }
    getData();
  }, []);


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position?.coords?.latitude) {
            GetCountry(
              position?.coords?.latitude,
              position?.coords?.longitude
            ).then((res) => {
              if (res?.address?.country) {
                CountryDetail(res?.address?.country).then((res) => {
                  setCountry(res[0]?.name);
                  setCountryCurrency(res[0]?.currencies[0]?.symbol);
                  setCountryTitle(res[0]?.currencies[0]?.code);
                  setFlag(res[0]?.flags?.png);
                });
              }
            });
          }
        },
        (error) => {
          console.error("Error retrieving location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
    
  }, []);
  return (
    <div className="main_offer">
      <div className="submain_offer">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={1}
          className="mySwiper"
          navigation={{
            prevEl: "swiperNavPrevRef1.current",
            nextEl: "swiperNavNextRef1.current",
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = swiperNavPrevRef1.current;
            swiper.params.navigation.nextEl = swiperNavNextRef1.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          {coupon.map((data) => (
            <SwiperSlide className="coupon_container">
              <h1>
                {data.discount}% CASHBACK
                
                <span>
                  Above {countrycurrency }{data.applyAmount} | NEW 50 {data.couponCode}{" "}
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
          <img src="cross.png" onClick={handleClose}/>
            <div className="coupon_code">
              <h6>{modal.couponCode}</h6>
            </div>
            <div className="coupon_apply_amount">
              <p>
                Apply Amount <span>{countrycurrency} {modal.applyAmount}</span>
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
                ExpiryDate:{" "}
               <span>{moment(modal.expiryDate).format("DD/MM/YYYY")}</span>
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
      <div className="swiperNavPrev1" ref={swiperNavPrevRef1}>
      <FaArrowLeft className="FaArrowLeftoffer" />
      </div>
      <div className="swiperNavNext1" ref={swiperNavNextRef1}>
      <FaArrowRight className="FaArrowRightoffer" />
      </div>
    </div>
  );
};

export default Offer;
