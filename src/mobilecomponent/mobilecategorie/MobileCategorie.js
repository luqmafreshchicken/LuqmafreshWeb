import React, { useEffect, useState } from "react";
import "./mobilecategorie.css";
import {
  CountryDetail,
  GetCountry,
  Show_Cart,
  getUserID,
  productCategorie,
  removeFromCart,
} from "../../serverRequest/Index";
import { ProductBySubCategoryId } from "../../serverRequest/Index";
import { NavLink, useLocation } from "react-router-dom";
import Loader from "../../component/loder/Loader";
import MobileBottomtab from "../mobilebottomtab/MobileBottomtab";
import ModalCart from "../../pages/modalcart/ModalCart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MobileCategorie = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [showText, setShowText] = React.useState(false);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");

  const [cartProduct, setCartProduct] = useState([]);
  const [countrycurrency, setCountryCurrency] = useState("");
  const [countrytitle, setCountryTitle] = useState("");

  // const [cartProduct, setCartProduct] = useState([]);
  const [cartPrice, setCartPrice] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    // setLoad(true);
    async function getData(res) {
      const newData = await productCategorie();
      setData(newData.data);
    }
    getData();
  }, []);

  const carthandleOpen = () => setCartOpen(true);
  const carthandleClose = () => setCartOpen(false);

  const categoryProduct = async (id) => {
    // setLoad(true);
    // setColorId(id);
    const requestData = {
      subCategoryId: id,
    };
    ProductBySubCategoryId(requestData).then((res) => {
      console.log(res);
      // if (res.status == true) {
      //   setProduct(res.data);
      //   setLoad(false);
      // } else {
      //   setLoad(false);
      // }
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position?.coords?.latitude) {
            GetCountry(
              position?.coords?.latitude,
              position?.coords?.longitude
            ).then((res) => {
              if (res?.address?.country) {
                CountryDetail(res?.address?.country).then((res) => {
                  // setCountry(res[0]?.name);
                  setCountryCurrency(res[0]?.currencies[0]?.symbol);
                  // setCountryTitle(res[0]?.currencies[0]?.code);
                  // setFlag(res[0]?.flags?.png);
                });
              }
            });
          }
        },
        (error) => {
          console.error("Error retrieving location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
    localContent();
    showcart();
  }, []);

  const handle = (id) => {
    setShowText(!showText);
  };
  const showcart = async () => {
    const userId = await getUserID();
    const data = {
      userId: userId,
    };
    const res = await Show_Cart(data);
    if (res.status == true) {
      setCartProduct(res.data.cart);
      setCartPrice(res.data.totalAmount);
    } else {
      setCartProduct([]);
      setCartPrice("");
    }
  };
  const removeCartProduct = async (id) => {
    const userId = await getUserID();
    const data = {
      userId: userId,
      productId: id,
    };
    removeFromCart(data).then((res) => {
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
        showcart();
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
    });
  };

  // remove local cart
  const removeLocalCart = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const cartPrice = JSON.parse(localStorage.getItem("cartPrice"));
    const cartData = cart?.filter((item) => item?.productId?._id !== id);
    const product = cart?.find((item) => item?.productId?._id === id);
    const removeProduct = cart?.filter((item) => item?.productId?._id !== id);
    cart?.length >= 1 &&
      localStorage.setItem(
        "cartPrice",
        JSON.stringify({ price: cartPrice?.price - product?.productId?.price })
      );
    cart?.length < 1 &&
      localStorage.setItem("cartPrice", JSON.stringify({ price: 0 }));
    localStorage.setItem("cart", JSON.stringify(cartData));
    setCartProduct(removeProduct);
    setCartPrice(
      cartPrice?.price -
        product?.productId?.price * product?.productId?.quantity
    );
    // setShowCartBtn(false);
    // setCount(0);
    // setShow(false);
    toast.success("Product remove from cart", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    localContent();
  };

  const localContent = () => {
    const items = JSON.parse(localStorage.getItem("userDetail"));
    if (items) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  };

  return (
    <div className="mobile_categorie">
      {/* heading */}
      <div className="mobile_All_categorie">
        <h5>All Categories</h5>
      </div>
      {/* end heading */}

      {data.map((item) => (
        <div className="mobile_single_list">
          {/* list 1 */}
          <div className="mobile_categorie_container">
            <div className="mobile_categorie_box">
              <div className="mobile_categorie_image">
                <img src={item.categoryImage} />
              </div>
              <div className="mobile_categorie_name">
                <p>{item.categoryName}</p>
              </div>
              {id === "" ? (
                <div className="mobile_categorie_arr">
                  <img
                    src="down (2).png"
                    onClick={() => {
                      setShow(true);
                      setId(item._id);
                    }}
                  />
                </div>
              ) : null}

              {id != "" ? (
                <div className="mobile_categorie_arr">
                  <img
                    src="upload.png"
                    style={{ height: "14px", width: "14px" }}
                    onClick={() => setId("")}
                  />
                </div>
              ) : null}
            </div>
            {item._id === id ? (
              <div className="mobile_subcategory">
                {item?.subcategories?.length >= 1 ? (
                  <>
                    {item?.subcategories.map((item) => (
                      <div className="mobile_subcategory_container">
                        <div className="mobile_subcategory_para">
                          <p onClick={() => categoryProduct(item._id)}>
                            <NavLink
                              to="/todaydeals"
                              state={{ id: item._id }}
                              className="nav_list"
                            >
                              {" "}
                              {item.subcategoryName}
                            </NavLink>
                          </p>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p>Product not found</p>
                )}
              </div>
            ) : null}
          </div>
          {/* end list 1 */}
        </div>
      ))}
      <Loader loading={load} />
      <ModalCart
        // cartopen={cartopen}
        cartopen={cartOpen}
        carthandleClose={carthandleClose}
        onclose={carthandleClose}
        loginStatus={true}
        cartProduct={cartProduct}
        // // cartProductlength={cartProduct}
        totalAmount={cartPrice}
        modalcurrency={countrycurrency}
        // totalAmount={totalAmount}
        // // modalcurrency={modalcurrency}
        // // removeProduct={removeProduct}
        removeProduct={(id) =>
          loginStatus == true ? removeCartProduct(id) : removeLocalCart(id)
        }
        // handleCartLogin={handleCartLogin}
        // // handleHome={handleHome}
        // handleHome={() => handleHome()}
      />
      <MobileBottomtab handleMobile={() => setCartOpen(true)} />
    </div>
  );
};

export default MobileCategorie;
