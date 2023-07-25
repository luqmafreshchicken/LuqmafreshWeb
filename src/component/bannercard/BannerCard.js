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

export default function BannerCard1() {
  const [banner, setBanner] = useState([]);

  const swiperNavPrevRef = useRef(null);
  const swiperNavNextRef = useRef(null);

  useEffect(() => {
    async function getBanner() {
      const newData = await BannerCard();
      setBanner(newData.data);
    }
    getBanner();
  }, []);
  const hanfleFullView = (id) => {
    console.log(id, "===============================");
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
        {banner.map((ban) => (
          <SwiperSlide>
            <div
              style={{
                backgroundImage: `url(${ban.image}) `,
                display: "block",
                width: "100%",
                height: "100%",
                objectfit: "cover",
              }}
              className="banner_sliderimg"
            >
              <div
                className="cashback_container"
                style={
                  {
                    // background: `linear-gradient(to right,  ${ban.color2} , rgba(255,255,255,0.02))`,
                  }
                }
              >
                <h1>{ban.title1}</h1>
                <h2>{ban.title2}% OFF</h2>
                <h5>{ban.title3}</h5>
                <div className="ban_discription">
                  <h6>{ban.description}</h6>
                </div>
                <NavLink to="/carddetail"
                state={{
                  id: {
                    id: ban.productId,
                  },
                }}>
                  <div
                    className="order_shop_btn"
                    onClick={() => hanfleFullView(ban._id)}
                  >
                    <button>SHOP NOW</button>
                  </div>
                </NavLink>
              </div>
            </div>
          </SwiperSlide>
        ))}
        {/*  <div className="swiperNavPrev" ref={swiperNavPrevRef}></div>
              <div className="swiperNavNext" ref={swiperNavNextRef}></div>*/}
      </Swiper>
    </div>
  );
}
