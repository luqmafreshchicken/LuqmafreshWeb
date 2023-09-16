import React, { useEffect, useState } from "react";
import "./mobilecategorie.css";
import {
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
  // const [cartProduct, setCartProduct] = useState([]);
  const [cartPrice, setCartPrice] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    setLoad(true);
    async function getData(res) {
      const newData = await productCategorie();
      setData(newData.data);
    }
    getData();
    const timer = setTimeout(() => {
      setLoad(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
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

  //   useEffect(() => {
  //     handle();
  //   }, []);

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
        loginStatus={loginStatus}
        cartProduct={cartProduct}
        // cartProductlength={cartProduct}
        totalAmount={cartPrice}
        modalcurrency={countrycurrency}
        // totalAmount={totalAmount}
        // modalcurrency={modalcurrency}
        // removeProduct={removeProduct}
        // removeProduct={(id) =>
        //   loginStatus == true ? removeCartProduct(id) : removeLocalCart(id)
        // }
        // handleCartLogin={handleCartLogin}
        // handleHome={handleHome}
        // handleHome={() => handleHome()}
        removeProduct={(id) => removeCartProduct(id)}
      />
      <MobileBottomtab handleMobile={() => setCartOpen(true)} />
    </div>
  );
};

export default MobileCategorie;
