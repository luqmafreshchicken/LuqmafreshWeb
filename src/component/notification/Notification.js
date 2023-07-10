import React from "react";
import "./notification.css";
const Notification = () => {

    
  return (
    <div>
      <div className="notification_heading">
        <p>Notification</p>
      </div>
      <div className="show_notification_list">
        <div className="show_notification_image">
          <img src="ChickenLC.webp" />
        </div>
        <div className="show_notification_text">
          <p>
            Order cancelled<br/>
            <span>Your order has been cancelled successfully</span>
          </p>
        </div>
        <div className="show_notification_time">
        <p>28/06/2023</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
