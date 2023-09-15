import axios from "axios";
import { apiConfig } from "./url";
const API_BASE_URL = "https://luqmafresh-backend-zzfk.onrender.com/";

// ort const Current_Live_Location = async (latitude, longitude) => {
//   return await API({
//     method: 'POST',
//     url:
//       apiConfig.Current_Location_Url +
//       latitude +
//       ',' +
//       longitude +
//       apiConfig.Current_Location_Url1,
//   })
//     .then(res => {
//       return res.data;
//     })
//     .catch(err => {
//       return err;
//     });
// };

export const currentLocation = async (latitude, longitude) => {
  console.log(latitude, longitude, "Kishan");
  const response = await axios.post(
    apiConfig.Current_Location_Url +
      latitude +
      "," +
      longitude +
      apiConfig.Current_Location_Url1
  );
  return response.data;
};

export const GetCountry = async (lat, lng) => {
  const response = await axios.get(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
  );
  return response.data;
};
export const CountryDetail = async (Cname) => {
  const response = await axios.get(
    `https://restcountries.com/v2/name/${Cname}?fullText=true`
  );
  return response.data;
};

export const getUserID = async () => {
  const items = JSON.parse(localStorage.getItem("userDetail"));
  return items?._id;
};

export const loginRegister = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}loginWithEmail`,
    requestData
  );
  return response.data;
};
export const resendOTP = async (requestData) => {
  const response = await axios.post(`${API_BASE_URL}resendOtp`, requestData);
  return response.data;
};

export const otpVerify = async (requestData) => {
  const response = await axios.post(`${API_BASE_URL}verifyOtp`, requestData);
  return response.data;
};

export const BannerCard = async () => {
  const response = await axios.get(`${API_BASE_URL}banner/getAllBanner`);
  return response.data;
};

export const productCategorie = async () => {
  const response = await axios.get(
    `${API_BASE_URL}category/categoryAndSubcategoryList`
  );
  return response.data;
};

export const todayDeals = async () => {
  const response = await axios.get(`${API_BASE_URL}product/getTodaydeals`);
  return response.data;
};

export const createAddress = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}address/createAddress`,
    requestData
  );
  return response.data;
};
export const getAddress = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}address/getAllAddress`,
    requestData
  );
  return response.data;
};

export const deleteAddress = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}address/deleteAddress`,
    requestData
  );
  return response.data;
};

export const updataAddress = async (requestData) => {
  const response = await axios.put(
    `${API_BASE_URL}address/updateAddress`,
    requestData
  );
  return response.data;
};

/* get all timeSlot */

export const getTimeslot = async () => {
  const response = await axios.get(`${API_BASE_URL}timeslot/getTimeslot`);
  return response.data;
};

/* newArrival API */

// export const newArrival = async () => {
//   const response = await axios.get(`${API_BASE_URL}product/NewArrivals` );
//   return response.data;
// };
export const newArrival = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}product/NewArrivals`,
    requestData
  );
  return response.data;
};

/* catProduct API */

export const catProduct = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}product/ProBycatName`,
    requestData
  );
  return response.data;
};

/* topSeverWeek API */

export const topSeverweek = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}product/TopSaverWeek`,
    requestData
  );
  return response.data;
};
// export const topSeverweek = async () => {
//   const response = await axios.get(`${API_BASE_URL}product/TopSaverWeek`);
//   return response.data;
// };

/* bestSeller API */

export const bestSeller = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}product/Bestsellers`,
    requestData
  );
  return response.data;
};
// export const bestSeller = async () => {
//   const response = await axios.get(`${API_BASE_URL}product/Bestsellers`);
//   return response.data;
// };

/* combo API */

export const comBos = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}product/getComboProduct`,
    requestData
  );
  return response.data;
};
// export const deleteData = async (id) => {
//   const response = await axios.delete(`${API_BASE_URL}/data/${id}`);
//   return response.data;
// };

// Product Deatsil By id

export const productDeatail = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}product/ProductFullDetails`,
    requestData
  );
  return response.data;
};

//combo Product Deatsil By id

export const productDeatail1 = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}product/getComboProductById`,
    requestData
  );
  return response.data;
};

//Add to cart
export const Add_to_cart = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}product/AddToCart`,
    requestData
  );
  return response.data;
};

// SHow cartsss by id
export const Show_Cart = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}product/ShowCartById`,
    requestData
  );
  return response.data;
};

// /* getAllProductImage API */

export const getAllProductImage = async (id) => {
  const response = await axios.get(
    `${API_BASE_URL}product/GetProductImage/` + id
  );
  return response.data;
};

// /* getAllcoupon API */

export const getAllCoupon = async () => {
  const response = await axios.get(`${API_BASE_URL}coupon/GetAllCoupon`);
  return response.data;
};

// /* getAllSubcategoryByCategoryId API */

export const getAllSubcategoryByCategoryId = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}category/getAllSubcategoryByCategoryId`,
    requestData
  );
  return response.data;
};

/* product/ProductBySubCategoryId API */

export const ProductBySubCategoryId = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}product/ProductBySubCategoryId`,
    requestData
  );
  return response.data;
};

/* areaWeServe API */
export const areaWeServe = async () => {
  const response = await axios.get(`${API_BASE_URL}admin/getAreaList`);
  return response.data;
};

/* searchProduct API */
export const searchProduct = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}product/SearchProduct`,
    requestData
  );
  return response.data;
};

/* viewProfile API */
export const viewProfile = async (UserId) => {
  const response = await axios.get(`${API_BASE_URL}userDeatilsById/` + UserId);
  return response.data;
};

/* viewProfile API */

export const EditprofileUser = async (name, email, gender, mobile) => {
  const userId = await getUserID();
  const formdata = new FormData();
  formdata.append("id", userId);
  formdata.append("name", name);
  formdata.append("email", email);
  formdata.append("gender", gender);
  formdata.append("mobile", mobile);
  // formdata.append("image", image);
  const res = await axios.post(`${API_BASE_URL}updateUserById`, formdata);
  console.log(formdata, "=====gayrav===============");

  return res.data;
};

// remove product from cart
export const removeFromCart = async (requestData) => {
  console.log(requestData);
  const response = await axios.post(
    `${API_BASE_URL}product/RemoveFromCart`,
    requestData
  );
  return response.data;
};

// /* create Order API */
export const createOrder = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}order/createOrder`,
    requestData
  );
  return response.data;
};

// /* verifyPayment API */
export const verifyPayment = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}order/verifyPayment`,
    requestData
  );
  return response.data;
};

// /* getOrderByUserId API */
export const getOrderByUserId = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}order/getOrderByUserId`,
    requestData
  );
  return response.data;
};

// /* getOrderById API */
export const getOrderById = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}order/getOrderById`,
    requestData
  );
  return response.data;
};

/* viewProfile API */
export const notificationList = async (UserId) => {
  const response = await axios.get(
    `${API_BASE_URL}notification/notificationByUserId/` + UserId
  );
  return response.data;
};

// /* cancle order API */
export const cancleOrder = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}order/cancelOrder`,
    requestData
  );
  return response.data;
};

// /* cancle order API */
export const productbyCategorie = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}product/ProductByCategoryId`,
    requestData
  );
  return response.data;
};
// /* cancle order API */
export const emailRegister = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}newsletter/registerNewsletter`,
    requestData
  );
  return response.data;
};

// /* cancle order API */
export const whistUserIDproductId = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}wishlist/addToWishlist`,
    requestData
  );
  return response.data;
};
// /* cancle order API */
export const showWhistListUserId = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}wishlist/wishlistById`,
    requestData
  );
  return response.data;
};

// /* cancle order API */
export const deleteVistList = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}wishlist/remove`,
    requestData
  );
  return response.data;
};

// /* cancle order API */
export const increaseQuantity = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}product/UpdateCartQuantity`,
    requestData
  );
  return response.data;
};

// /* cancle order API */
export const applyCoupon = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}coupon/applyCoupon`,
    requestData
  );
  return response.data;
};

/* viewProfile API */
export const showNotification = async (UserId) => {
  const response = await axios.get(`${API_BASE_URL}notification/notificationByUserId/` + UserId);
  return response.data;
};

// /* cancle order API */
export const updateTimeSlot  = async (requestData) => {
  const response = await axios.put(
    `${API_BASE_URL}timeslot/updateTimeslot`,
    requestData
  );
  return response.data;
};
