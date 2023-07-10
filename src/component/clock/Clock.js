// import React, { useEffect, useRef, useState } from "react";
// import "./clock.css";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";

// const Clock = ({ clockhandleClose, clockopen }) => {
//   const [days, setDays] = useState("00");
//   const [hours, setHours] = useState("00");
//   const [minutes, setMinutes] = useState("00");
//   const [seconds, setSeconds] = useState("00");

//   let interval = useRef();
//   const startTimer = () => {
//     const countdownDate = new Date("May 10, 2023 00:00:00").getTime();
//     interval = setInterval(() => {
//       const now = new Date().getTime();
//       const distance = countdownDate - now;
//       const current_days = Math.floor(distance / (1000 * 60 * 60 * 24));
//       const current_hours = Math.floor(
//         (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//       );
//       const current_minutes = Math.floor(
//         (distance % (1000 * 60 * 60)) / (1000 * 60)
//       );
//       const current_seconds = Math.floor((distance % (1000 * 60)) / 1000);

//       if (distance < 0) {
//         clearInterval(interval.current);
//       } else {
//         setDays(current_days);
//         setHours(current_hours);
//         setMinutes(current_minutes);
//         setSeconds(current_seconds);
//       }
//     }, 1000);
//   };

//   useEffect(() => {
//     startTimer();
//     return () => {
//       clearInterval(interval.current);
//     };
//   });

//   return (
//     <div>
//       <Modal
//         open={clockopen}
//         onClose={clockhandleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box className="modal_clock">
//           <section className="timer-container">
//             <section className="timer">
//               <div>
//                 <img
//                   src="timetable.png"
//                   className="timer_icon"
//                   height="60px"
//                   width="60px"
//                 />
//                 <h2>Countdown Timer</h2>
//               </div>
//               <div>
//                 <section>
//                   <p>{days}</p>
//                   <p>
//                     <small>Days</small>
//                   </p>
//                 </section>
//                 <span>:</span>
//                 <section>
//                   <p>{hours}</p>
//                   <p>
//                     <small>Hours</small>
//                   </p>
//                 </section>
//                 <span>:</span>{" "}
//                 <section>
//                   <p>{minutes}</p>
//                   <p>
//                     <small>Minutes</small>
//                   </p>
//                 </section>
//                 <span>:</span>{" "}
//                 <section>
//                   <p>{seconds}</p>
//                   <p>
//                     <small>Second</small>
//                   </p>
//                 </section>
//               </div>
//             </section>
//           </section>
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default Clock;
