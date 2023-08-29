import * as React from "react";
import "./bannercard.css";
import { useEffect, useState, useRef } from "react";
import { BannerCard } from "../../serverRequest/Index";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
} from "swiper";
import "swiper/css/navigation";
import { NavLink } from "react-router-dom";

export default function BannerCard1({ productId, to }) {
  const [banner, setBanner] = useState([]);

  const swiperNavPrevRef = useRef(null);
  const swiperNavNextRef = useRef(null);

  useEffect(() => {
    getbenner();
  }, []);

  const getbenner = async () => {
    const newData = await BannerCard();
    if (newData?.status === true) {
      setBanner(newData.data);
    } else {
    }
  };

  const handleShopNowClick = (productId) => {
    console.log("Product ID:", productId);
    // You can perform any other actions related to the clicked product here
  };

  return (
    <div classname="main_banner_card" style={{ marginTop: "20px" }}>
      <Swiper
        modules={[
          Navigation,
          Autoplay,
          Pagination,
          Scrollbar,
          A11y,
          EffectFade,
        ]}
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
        // navigation={{
        //   prevEl: "swiperNavPrevRef.current",
        //   nextEl: "swiperNavNextRef.current",
        // }}
        effect="fade"
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = swiperNavPrevRef.current;
          swiper.params.navigation.nextEl = swiperNavNextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="mySwiper"
      >
        {banner.map((item, index) => (
          <SwiperSlide key={item._id}>
            <div
              style={{
                backgroundImage: `url(${item?.image}) `,
                display: "block",
                width: "100%",
                height: "100%",
                objectfit: "cover",
              }}
              className="banner_sliderimg"
            >
              <div className="cashback_container">
                <h1>{item?.title1}</h1>
                <h2>{item?.title2}% OFF</h2>
                <h5>{item?.title3}</h5>
                <div className="ban_discription">
                  <h6>{item?.description}</h6>
                </div>
                <NavLink to="/carddetail" state={{ id: item?.productId }}>
                  <div className="order_shop_btn">
                    <button onClick={() => handleShopNowClick(item?.productId)}>
                      SHOP NOW
                    </button>
                  </div>
                </NavLink>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-pagination"> </div>
      </Swiper>
    </div>
  );
}
