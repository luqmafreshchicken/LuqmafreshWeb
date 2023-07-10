import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import CardOne from "../../customcomponent/cardone/CardOne";
import { Add_to_cart, comBos, getUserID } from "../../serverRequest/Index";
import * as moment from "moment";
import "./cardsliderone.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CardSliderOne = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData(res) {
      const newData = await comBos();
      setData(newData.data);
    }
    getData();
  }, []);

  const AddToCart1 = async (id) => {
    const UserId = await getUserID();
    const data = {
      userId: UserId,
      productId: id,
      quantity: "1",
    };

    const res = await Add_to_cart(data);
    console.log(res);
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
    <div className="carouselitem1">
      <div className="cardswrapper1">
        <div className="card_slider1">
          {data.length >= 1 ? (
            <>
              {data.map((card) => (
                <CardOne
                  img1={card.image}
                  discount={card.discount}
                  name={card.name}
                  qty={card.quantity}
                  unit={card.unit}
                  price={card.price}
                  originalprice={card.originalPrice}
                  days={moment(card.discountExpiryDate).format("dddd")}
                  time={card.deliveryTime}
                  onclick={() => AddToCart1(card._id)}
                  rating={card.rating}
                  to="/carddetail1"
                  id={{ id: card._id }}
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

export default CardSliderOne;
