import React, { useEffect, useRef, useState } from "react";
import "./countdown.css";
import Clock from "../clock/Clock";

const CountDown = () => {
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  let interval = useRef();
  const startTimer = () => {
    const countdownDate = new Date("July 30, 2023 00:00:00").getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;
      const current_days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const current_hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const current_minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      const current_seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setDays(current_days);
        setHours(current_hours);
        setMinutes(current_minutes);
        setSeconds(current_seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });
  return (
    <div className="countdown_section_container">
      <div className="countdown_section">
        <div className="top_severweek">
          <p>Top Sever Week</p>
          <span>Most popular products near you!</span>
        </div>

        {/* <div className="countdown">
          <div>
            <p>
              {days}
              <br />
              <span>days</span>
            </p>
          </div>
          :
          <div>
            <p>
              {hours} <br />
              <span>Hours</span>
            </p>
          </div>
          :
          <div>
            <p>
              {minutes} <br />
              <span>Minutes</span>
            </p>
          </div>
          :
          <div>
            <p>
              {seconds} <br />
              <span>Seconds</span>
            </p>
          </div>
  </div>*/}
      </div>
    </div>
  );
};

export default CountDown;
