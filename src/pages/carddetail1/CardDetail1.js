import React, { useEffect, useState } from "react";
import CardFullDetail1 from "../../customcomponent/cardfulldetail/CardfullDetail1";
import ImagesCard from "../../customcomponent/imagescard/ImagesCard";
import Card from "../../customcomponent/card/Card";

import "swiper/css";
import "swiper/css/navigation";
import { Add_to_cart, getUserID, newArrival } from "../../serverRequest/Index";
import * as moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CardDetail1 = () => {
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
  return (
    <div>
      <CardFullDetail1 />
      <ImagesCard />
      <div className="carddetail_slider_heading_container">
        <div className="carddetail_slider_heading_content">
          <h4>You May Also Like</h4>
        </div>
      </div>
      <div className="carddetail_slider_container">
        <div className="carddetail_slider_content">
          {data.length >= 1 ? (
            <>
              {data.map((detail, index) => (
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
                  // to="/carddetail"
                  onclick={() => AddToCart(detail._id)}
                  id={{ id: detail._id }}
                  rating={detail.rating}
                  img={detail.image}
                />
              ))}
            </>
          ) : null}
          <div className="slider_next_btn1">
            <img src="rtarrow.png" height="20px" width="20px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail1;
