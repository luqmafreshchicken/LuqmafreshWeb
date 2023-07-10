// // // // // import React, { useState } from "react";

// // // // // const Test1 = () => {
// // // // //   const [showInput, setShowInput] = useState(true);
// // // // //   const [isFocused, setIsFocused] = useState(false);
// // // // //   return (
// // // // //     <div>
// // // // //       <button onClick={() => setShowInput(!showInput)} hidden={!isFocused}>
// // // // //         Enter Mobile Number
// // // // //       </button>
// // // // //       <input
// // // // //         type="text"
// // // // //         hidden={showInput}
// // // // //         onFocus={() => setIsFocused(true)}
// // // // //         onBlur={() => setIsFocused(false)}
// // // // //       />
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Test1;

// import React from "react";
// import "./test.css";
// import { NavLink } from "react-router-dom";
// const Test = () => {
//   return (
//     <>
//     <div className="mobile_input">
//     <NavLink
//       to="/search"
//       className="nav_list"
//       style={{
//         width: "100%",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <div className="mobile_input_search">
//         <input
//           placeholder="Search for any delicious product"
//           disabled={false}
//           // onChange={onchange}
//           // value={value}
//         />
//         <img src="search.png" height="17px" width="17px" />
//       </div>
//     </NavLink>
//   </div>
//     <di className="navbar">
//       <div className="desktop_herder_content">
//         <nav className="main_nav">
//           <div className="luqma_logo">
//             <img src="01.png" height="70px" width="150px" />
//           </div>

//           <div className="luqma_location">
//             <div className="luqma_location_top">
//               <img src="map.png" />
//               <p>Lucknow</p>
//               <img src="down (2).png" />
//             </div>
//             <div className="luqma_location_bottom">
//               <p>Near Lulu Mall, Lucknow India</p>
//             </div>
//           </div>

//           <div className="luqma_input">
//             <input
//               placeholder="Search for any delecious product"
//               type="search"
//             />
//             <img src="search.png" height="20px" width="20px" />
//           </div>

//           <div className="luqma_option">
//             <ul>
//               <NavLink className="nav_list">
//                 <li>
//                 <div className="currency_container">
//                  <img src="menu (4).png"/>
//                  <p>Currency</p>
//                 </div>
//                 </li>
//               </NavLink>
//               <NavLink className="nav_list">
//                 <li><div className="currency_container">
//                 <img src="user (3).png"/>
//                 <p>Login</p>
//                 </div></li>
//               </NavLink>
//               <NavLink className="nav_list">
//                 <li>
//                   <div className="cart_border_container">
//                     <div className="cart_border_content1">
//                       <img src="grocery-store.png" />
//                     </div>
//                     <div className="cart_border_content2">
//                       <p>
//                         1 Items <br />
//                         <span>₹201.88</span>
//                       </p>
//                     </div>
//                   </div>
//                 </li>
//               </NavLink>
//             </ul>
//           </div>
//         </nav>
//       </div>
//     </di>
//     </>
//   );
// };

// export default Test;

// {
//   /*
//  <>
//       <div className="search_input">
//         <input placeholder="Search for any delicious product" />
//         <img src="search.png" height="17px" width="17px" />
//       </div>
//       <nav className="main_nav">
//         <div className="luqma_logo">
//           <img src="01.png" height="70px" width="150px" />
//         </div>

//         <div className="luqma_location"></div>

//         <div className="luqma_input">
//           <p>Search for any delecious product</p>
//           <img src="search.png" height="20px" width="20px" />
//         </div>

//         <div className="luqma_option">
//           <ul>
//             <NavLink>
//               <li>Currency</li>
//             </NavLink>
//             <NavLink>
//               <li>Login</li>
//             </NavLink>
//             <NavLink>
//               <li>Cart</li>
//             </NavLink>
//           </ul>
//           <div className="hamburger_menu">
//             <img src="menu (1).png" height="30px" width="30px" />
//           </div>
//         </div>
//       </nav>
//  */
// }

import React from 'react'
// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Test = () => {
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'hori',
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
  return (
    <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div>
    </div>
    <div class="swiper-pagination"></div>
  
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  
    <div class="swiper-scrollbar"></div>
  </div>
  )
}

export default Test
