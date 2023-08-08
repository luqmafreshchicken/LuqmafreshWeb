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
    async function getBanner() {
      const newData = await BannerCard();
      // console.log(newData.data[0] ,"===============product================");

      setBanner(newData.data);
    }
    getBanner();
  }, []);
  const hanfleFullView = (productId) => {
    // console.log(productId, "=============11111111111111111==================");
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
       {/* <SwiperSlide>
          <div
            style={{
              backgroundImage: `url(${"https://res.cloudinary.com/dgghwthdr/image/upload/v1690102908/banner/02_tajzy0.png"}) `,
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
                  // to='/carddetail' state={{ productId: productId }}
                }
              }
            >
              <h1>{"Fresh Nulli Mutton"}</h1>
              <h2>{"Upto 10"}% OFF</h2>
              <h5>{"Use code M50"}</h5>
              <div className="ban_discription">
                <h6>
                  {"Enjoy complimentary shipping for orders above AED 1000."}
                </h6>
              </div>
              <NavLink
                to="/carddetail"
                state={{
                  id: {
                    id: "64bd92181499daeff33142e3",
                  },
                }}
              >
                <div
                  className="order_shop_btn"
                  // onClick={(ban) => hanfleFullView(ban.productId)}
                >
                  <button>SHOP NOW</button>
                </div>
              </NavLink>
            </div>
          </div>
        </SwiperSlide>
              */}
        {/*<SwiperSlide>
          <div
            style={{
              backgroundImage: `url(${"https://res.cloudinary.com/dgghwthdr/image/upload/v1690102908/banner/01_osyl29.png"}) `,
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
                  // to='/carddetail' state={{ productId: productId }}
                }
              }
            >
              <h1>{"Fresh Boneless Mutton"}</h1>
              <h2>{"Upto 10"}% OFF</h2>
              <h5>{"Use code M50"}</h5>
              <div className="ban_discription">
                <h6>
                  {"Enjoy complimentary shipping for orders above AED 1000."}
                </h6>
              </div>
              <NavLink
                to="/carddetail"
                state={{
                  id: {
                    id: "64bd8f231499daeff331420e",
                  },
                }}
              >
                <div
                  className="order_shop_btn"
                  // onClick={(ban) => hanfleFullView(ban.productId)}
                >
                  <button>SHOP NOW</button>
                </div>
              </NavLink>
            </div>
          </div>
        </SwiperSlide>
              */}
        <SwiperSlide>
          <div
            style={{
              backgroundImage: `url(${"https://res.cloudinary.com/dgghwthdr/image/upload/v1690102907/banner/04_jop4ah.png"}) `,
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
                  // to='/carddetail' state={{ productId: productId }}
                }
              }
            >
              <h1>{"Fresh Boneless Chicken"}</h1>
              <h2>{"Upto 15"}% OFF</h2>
              <h5>{"use our copons codes"}</h5>
              <div className="ban_discription">
              <h6>
                  {"Revel in the perks of complimentary shipping on all orders*"}
            </h6>
              </div>
              <NavLink
                to="/carddetail"
                state={{
                  id: {
                    id: "64bed069337a6343fd9cb9a7",
                  },
                }}
              >
                <div
                  className="order_shop_btn"
                  // onClick={(ban) => hanfleFullView(ban.productId)}
                >
                  <button>SHOP NOW</button>
                </div>
              </NavLink>
            </div>
          </div>
        </SwiperSlide>
        {/*  <div className="swiperNavPrev" ref={swiperNavPrevRef}></div>
              <div className="swiperNavNext" ref={swiperNavNextRef}></div>*/}
        <div className="swiper-pagination"> </div>
      </Swiper>
    </div>
  );
}
