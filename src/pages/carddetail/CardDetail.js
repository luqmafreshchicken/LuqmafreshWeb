import React, { useEffect, useState, useRef } from "react";
import Card from "../../customcomponent/card/Card";

import CardFullDetail from "../../customcomponent/cardfulldetail/CardFullDetail";
import ImagesCard from "../../customcomponent/imagescard/ImagesCard";
import "./carddetail.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Add_to_cart, getUserID, newArrival } from "../../serverRequest/Index";
import * as moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Text from "../../component/text/Text";
import { Navigation, Parallax } from "swiper";



const CardDetail = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData(res) {
      const newData = await newArrival();
      setData(newData.data);
    }
    // window.scrollTo(0, 0)
    getData();
  }, []);

  const AddToCart = async (id) => {
    const UserId = await getUserID();
    const data = {
      userId: UserId,
      productId: id,
      quantity: "1",
    };
    const res = await Add_to_cart(data);
    if (res.status == true) {
      toast.success(res.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(res.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const swiperNavPrevRef = useRef(null);
  const swiperNavNextRef = useRef(null);
  return (
    <div>
      <CardFullDetail />
      <ImagesCard />
      <div>
        <div className="next_prev_btn_container">
          <div className="next_prev_btn">
            <div className="head_box">
              <Text
                heading1="You May Also Like"
                text1="Most popular products near you!"
              />
            </div>
            <div className="next_prev_btn_content">
              <div className="swiperNavPrev" ref={swiperNavPrevRef}>
                <FaArrowLeft className="FaArrowLeft" />
              </div>
              <div className="swiperNavNext" ref={swiperNavNextRef}>
                <FaArrowRight className="FaArrowRight" />
              </div>
            </div>
          </div>
        </div>
        <div className="carouselitem">
          <div className="cardswrapper">
            <Swiper
              slidesPerView={1}
              spaceBetween={8}
              pagination={{
                clickable: true,
              }}
              parallax={true}
              navigation={{
                prevEl: "swiperNavPrevRef.current",
                nextEl: "swiperNavNextRef.current",
              }}
              onInit={(swiper) => {
                swiper.params.navigation.prevEl = swiperNavPrevRef.current;
                swiper.params.navigation.nextEl = swiperNavNextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
              }}
            
              modules={[Navigation, Parallax]}
            >
              {data.length >= 1 ? (
                <>
                  {data.map((detail, index) => (
                    <SwiperSlide>
                      <Card
                        offer={detail.discount}
                        productName={detail.name}
                        weight={detail.quantity}
                        unit={detail.unit}
                        total={detail.price}
                        cutotal={detail.originalPrice}
                        offer1={detail.discount}
                        today={moment(detail.discountExpiryDate).format("dddd")}
                        date={detail.deliveryTime}
                        totalpayment={detail.price}
                        to="/carddetail"
                        onclick={() => AddToCart(detail._id)}
                        id={{ id: detail._id }}
                        rating={detail.rating}
                        img={detail.image}
                        // onclick1={() => fullView(detail._id)}
                        // onclick2={() => setWhistlistOpen(true)}
                      />
                    </SwiperSlide>
                  ))}
                </>
              ) : null}
            </Swiper>
          </div>
         
        
        </div>
      </div>
    </div>
  );
};

export default CardDetail;

{
  /*
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Navigation } from 'swiper/modules';

export default function App() {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
}
*/
}
