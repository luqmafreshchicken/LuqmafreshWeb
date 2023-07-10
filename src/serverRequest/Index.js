import axios from "axios";
const API_BASE_URL = "https://luqmafresh-backend-icd4.onrender.com/";


export const getUserID = async () => {
  const items = JSON.parse(localStorage.getItem("userDetail"));
  return items._id;
};

export const loginRegister = async (requestData) => {
  const response = await axios.post(
    `${API_BASE_URL}loginWithMobile`,
    requestData
  );
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
  const response = await axios.get(`${API_BASE_URL}category/categoryAndSubcategoryList`);
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

export const newArrival = async () => {
  const response = await axios.get(`${API_BASE_URL}product/NewArrivals`);
  return response.data;
};

  /* topSeverWeek API */

export const topSeverweek = async () => {
  const response = await axios.get(`${API_BASE_URL}product/TopSaverWeek`);
  return response.data;
};

  /* bestSeller API */

export const bestSeller = async () => {
  const response = await axios.get(`${API_BASE_URL}product/Bestsellers`);
  return response.data;
};

  /* combo API */

export const comBos = async () => {
  const response = await axios.get(`${API_BASE_URL}product/getComboProduct`);
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

  export const EditprofileUser = async (name, email, gender, image) => {
    const userId = await getUserID();
    const formdata = new FormData();
    formdata.append("id", userId);
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("gender", gender);
    formdata.append("image", image);
    const res = await axios.post(`${API_BASE_URL}updateUserById`, formdata);
    return res.data;
  };

  // remove product from cart
  export const removeFromCart = async (requestData) => {
    console.log(requestData)
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
    const response = await axios.get(`${API_BASE_URL}notification/notificationByUserId/` + UserId);
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