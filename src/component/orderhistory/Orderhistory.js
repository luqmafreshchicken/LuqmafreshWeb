import React, { useEffect, useState } from "react";
import "./orderhistory.css";
import { getOrderByUserId, getUserID } from "../../serverRequest/Index";
import * as moment from "moment";
import { NavLink } from "react-router-dom";
import Loader from "../loder/Loader";

const Orderhistory = ({ id, countyCurrency }) => {
  const [getData, setGetData] = useState([]);
  const [load, setLoad] = useState([]);

  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async () => {
    setLoad(true);

    const id = await getUserID();
    const requestData = {
      userId: id,
    };
    getOrderByUserId(requestData).then((res) => {
      if (res.status == true) {
        setGetData(res.data);
        setLoad(false);
      } else {
        setLoad(false);
      }
    });
  };

  return (
    <div className="order_list">
      {/* ***past heading*** */}
      <div className="order_historylist_container">
        <h5>My Orders</h5>
      </div>
      {/* end past heading */}

      {/* ****order date time*** */}

      {getData?.length >= 1 ? (
        <>
          {getData.map((item) => (
            <>
              <div className="mobile_border_box">
                <div className="order_date_time">
                  <div className="order_date_text">
                    <p>
                      {" "}
                      Order Placed :{" "}
                      {moment(item.createdAt).format("DD/MM/YYYY")}
                    </p>
                    <p>
                      Mode : <span>{item.method}</span>
                    </p>
                  </div>
                  <div className="order_id_text">
                    <p>Shipment ID: {item.orderId}</p>
                  </div>
                </div>
                {item.productId.map((item1) => (
                  <div className="orderlist_detail">
                    <div className="orderlist_detail_img">
                      <img src={item1.image} />
                    </div>

                    <div className="orderlist_detail_text">
                      <h5>{item1?.name}</h5>
                      <div className="orderlist_detail_weight_price">
                        <p>
                          {item1.quantity}
                          {item1.unit}
                        </p>
                        <p style={{ color: "black", fontWeight: "580" }}>
                          {countyCurrency} {item1.price}
                        </p>
                        <p
                          style={{
                            color: "green",
                            fontWeight: "580",
                            textDecoration: "line-through",
                          }}
                        >
                          {countyCurrency} {item1.originalPrice}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="track_order">
                  <NavLink
                    to="/viewdetails"
                    className="nav_list"
                    state={{ orderId: item?._id }}
                  >
                    <div className="track_order_btn">
                      <p>View Details</p>
                    </div>
                  </NavLink>
                </div>
              </div>
            </>
          ))}
        </>
      ) : (
        <div className="order_not_found">
          <div className="order_not">
            <img src="empty.png" />
            <h5>No orders found</h5>
          </div>
        </div>
      )}
      <Loader loading={load} />

    </div>
  );
};

export default Orderhistory;
