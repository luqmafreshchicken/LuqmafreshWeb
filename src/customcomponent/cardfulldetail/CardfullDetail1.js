import * as React from "react";
import "./cardfulldetail.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  productDeatail1,
  Add_to_cart,
  getUserID,
  getAllProductImage,
} from "../../serverRequest/Index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../component/header/Header";
import Loader from "../../component/loder/Loader";

export default function CardFullDetail1({ id }) {
  let location = useLocation();
  const [show, setShow] = useState(false);
  const [incre, setIncre] = useState(1);
  const [product, setProduct] = useState([]);
  const [allImage, setAllImage] = useState([]);
  const [load, setLoad] = useState(false);

  const increment = () => {
    setIncre(incre + 1);
  };
  const decrement = () => {
    setIncre(incre - 1);
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);

    fullView();
    all_Image();
  }, []);

  const fullView = async () => {
    setLoad(true);
    const id = location.state.id.id;
    const requestData = {
      productId: id,
    };

    productDeatail1(requestData).then((res) => {
      if (res.status == true) {
        setProduct(res.data);
        setLoad(false);
      } else {
        setLoad(false);
      }
    });
  };

  const all_Image = async () => {
    const id = location.state.id.id;
    getAllProductImage(id).then((res) => {
      if (res.status == true) {
        setAllImage(res.data);
      } else {
      }
    });
  };
  const AddToCart = async () => {
    const UserId = await getUserID();
    const data = {
      userId: UserId,
      productId: product._id,
      quantity: incre,
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
    <>
      <Header />
      <div className="cardetail_container" state={{ productId: id }}>
        <div className="cardetail">
          {/* image_card */}
          <div className="image_cardetail">
            <div className="image_cardetail_slider">
              {allImage.map((img) => (
                <img src={img.image} style={{ width: "100%", height: 376 }} />
              ))}
              {
                <div className="slider_next_btn_full_detail">
                  <img src="rtarrow.png" height="20px" width="20px" />
                </div>
              }
            </div>
          </div>
          {/* card_content */}
          <div className="cardetail_content">
            <div className="cardetail1">
              <h4>{product.name}</h4>
              <p> {product.description}</p>
              <hr style={{ height: "1px" }} />
              <p>{product.description1} </p>
              <p> {product.description2}</p>
              <p>{product.description3}</p>

              <div className="image_text_container">
                <div className="image_text_content1">
                  <div style={{ display: "flex" }}>
                    <img src="usp.png" />
                    <span style={{ padding: "15px 0px" }}>
                      No. of Pieces 3-4
                    </span>
                  </div>

                  <div className="image_text_content2">
                    <img src="usp2.png" height="50px" width="50px" />
                    <span style={{ padding: "15px 10px" }}>Serves 4</span>
                  </div>
                </div>
                <div
                  style={{
                    height: "6vh",
                    width: "100%",
                  }}
                >
                  <div className="image_text_content3">
                    <img src="usp8.png" height="50px" width="50px" />
                    <span style={{ padding: "15px 10px" }}>
                      Net wt.{product.quantity}
                      {product.unit}
                    </span>
                  </div>
                </div>
              </div>
              <div className="cardfull_detail_text">
                <div>
                  <h3 style={{ paddingTop: "20px", color: "#d11243" }}>
                    ₹{product.price}
                    <span
                      style={{
                        fontSize: "14px",
                        color: "grey",
                        textDecoration: "line-through",
                      }}
                    >
                      {" "}
                      MRP: ₹{product.originalPrice}{" "}
                    </span>
                    <span
                      style={{
                        fontSize: "17px",
                        color: "green",
                      }}
                    >
                      {product.discount}% OFF
                    </span>
                  </h3>
                </div>
                {show === false ? (
                  <div className="Add_to_cart_btn">
                    <button onClick={() => setShow(!show)}>ADD</button>
                  </div>
                ) : (
                  <div
                    hidden={!show}
                    onClick={() => AddToCart()}
                    className="full_view_incre_btn"
                  >
                    <p onClick={increment}>+</p>
                    <p>{incre}</p>
                    <p onClick={decrement}>-</p>
                  </div>
                )}
              </div>
              <hr style={{ height: "1px" }} />
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ToastContainer />
        <Loader loading={load} />
      </div>
    </>
  );
}
