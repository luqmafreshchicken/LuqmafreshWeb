import React from "react";
import "./notification.css";
import { useEffect } from "react";
import { useState } from "react";
import { getUserID, showNotification } from "../../serverRequest/Index";
const Notification = () => {
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    notiList();
  }, []);

  const notiList = async () => {
    const UserId = await getUserID();
    const res = await showNotification(UserId);
    if (res.status == true) {
      setNotification(res?.data);
    } else {
    }
  };

  return (
    <div>
      <div className="notification_heading">
        <p>Notification</p>
      </div>
      <div className="show_notification_list">
      {notification.map((list, index) => (
        <div className="show_notification_heading">
        <h5>{list?.type}</h5>
        <p>
        {list?.message}
        </p>
        <span>20/09/2023</span>
      </div>
      ))}
      </div>
    </div>
  );
};

export default Notification;
