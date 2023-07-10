import React, { useEffect, useState } from "react";
import Card from "../../customcomponent/card/Card";
import "react-multi-carousel/lib/styles.css";
import { Add_to_cart, getUserID, topSeverweek } from "../../serverRequest/Index";
import * as moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TopSeverWeek = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const newData = await topSeverweek();
      setData(newData.data);
    }
    getData();
  }, []);

  const AddToCart = async (id) => {
    const UserId = await getUserID();
    const data = {
      userId: UserId,
      productId:id,
      quantity:"1"
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
    <div className="carouselitem">
      <div className="cardswrapper">
        <div className="card_slider">
          {data.length >= 1 ? (
            <>
              {data.map((detail) => (
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

                />
              ))}
            </>
          ) : null}
          <div className="slider_next_btn">
          <img src="rtarrow.png" height="20px" width="20px" />
        </div>
        </div>
      </div>
    </div>
  );
};

export default TopSeverWeek;
