import React, { useEffect, useState } from "react";
import SubCategorieList from "./component/subcategorielist/SubCategorieList";
import { useLocation } from "react-router-dom";
import "./todaydeal.css";
import {
  Add_to_cart,
  getAllSubcategoryByCategoryId,
  getUserID,
  ProductBySubCategoryId,
  productbyCategorie,
} from "../../serverRequest/Index";
import Header from "../../component/header/Header";
import Loader from "../../component/loder/Loader";
import * as moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "../../customcomponent/card/Card";
import ProductNotFound from "../../customcomponent/productnotfound/ProductNotFound";

const TodayDeals = () => {
  let location = useLocation();
  const [subcategorie, setSubcategorie] = useState([]);
  const [product, setProduct] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    subCategorie();
    productAll();
    window.scrollTo(0, 0);
  }, []);

  const subCategorie = () => {
    setLoad(true);
    const categoryId = location.state.id.id;
    const requestData = {
      id: categoryId,
    };
    getAllSubcategoryByCategoryId(requestData).then((res) => {
      if (res.status == true) {
        setSubcategorie(res.data);
        setLoad(false);
        // categoryProduct(res?.data[0]?._id);
      } else {
        setLoad(false);
      }
    });
  };

  const categoryProduct = async (id) => {
    setLoad(true);

    const requestData = {
      subCategoryId: id,
    };
    ProductBySubCategoryId(requestData).then((res) => {
      if (res.status == true) {
        setProduct(res.data);
        setLoad(false);
      } else {
        setLoad(false);
      }
    });
  };

  const productAll = async (id) => {
    setLoad(true);
    const categoryId = location.state.id.id;

    const requestData = {
      categoryId: categoryId,
    };
    console.log(requestData, "=============1234567============");

    productbyCategorie(requestData).then((res) => {
      if (res.status == true) {
        setProduct(res.data);
        setLoad(false);
      } else {
        setLoad(false);
      }
    });
  };
  const handleCart = async (id) => {
    const UserId = await getUserID();
    const data = {
      userId: UserId,
      productId: id,
      quantity: "1",
    };
    console.log(data, "gaurav joshi");

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
      <div>
        {subcategorie.length >= 1 ? (
          <div className="subcategorie_contaner">
            <div className="subcategorie_content">
              {subcategorie.map((category) => (
                <SubCategorieList
                  // img={category.subcategoryImage}
                  name={category.subcategoryName}
                  onclick={() => categoryProduct(category._id)}
                />
              ))}
            </div>
            <Loader loading={load} />
          </div>
        ) : null}

        {product.length >= 1 ? (
          <div className="main_today_card">
            <div className="today_card">
              {product.map((item) => (
                <Card
                  offer={item.discount}
                  productName={item.name}
                  weight={item.quantity + "  " + item.unit}
                  total={item.price}
                  cutotal={item.originalPrice}
                  offer1={item.discount}
                  today={moment(item.discountExpiryDate).format("dddd")}
                  date={item.deliveryTime}
                  totalpayment={item.price}
                  img={item.image}
                  rating={item.rating}
                  id={{ id: item._id }}
                  to="/carddetail"
                  onclick={() => handleCart(item._id)}
                />
              ))}
              <Loader loading={load} />
            </div>
          </div>
        ) : (
          <>
            <ProductNotFound />
          </>
        )}

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
      </div>
    </>
  );
};

export default TodayDeals;
