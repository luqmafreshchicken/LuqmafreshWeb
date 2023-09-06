import * as React from "react";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import "./bannercard.css";
import { useEffect, useState, useRef } from "react";
import { BannerCard } from "../../serverRequest/Index";
import { NavLink } from "react-router-dom";

export default function BannerCard1({ productId, to }) {
  const [banner, setBanner] = useState([]);

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
    <Slide autoplay={false}>
      {banner.map((item) => (
        <div className="each-slide-effect">
          <div
            style={{
              backgroundImage: `url(${item?.image}) `,
            }}
            className="banner_slider"
          >
            <div className="cashback_container">
              <div className="cashback_content">
                <h1>{item?.title1}</h1>
                <h2>{item?.title2} OFF</h2>
                <h5>{item?.title3}</h5>
                <div className="ban_discription">
                  <h6>{item?.description}</h6>
                </div>
                <NavLink to="/carddetail" state={{ 
                  id:{
                    id: item?.productId
                  }
                 }}>
                  <button onClick={() => handleShopNowClick(item?.productId)}>
                    SHOP NOW
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slide>
  );
}
