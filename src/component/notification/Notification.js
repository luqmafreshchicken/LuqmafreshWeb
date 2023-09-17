import React from "react";
import "./notification.css";
import { useEffect } from "react";
import { useState } from "react";
import { getUserID, showNotification } from "../../serverRequest/Index";
import moment from "moment/moment";
const Notification = () => {
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    notiList();
  }, []);

  const notiList = async () => {
    const UserId = await getUserID();
    const res = await showNotification(UserId);
    console.log(res,"==================")
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
        <span>{moment(list?.createdAt).format("DD/MM/YYYY")}</span>
      </div>
      ))}
      </div>
    </div>
  );
};

export default Notification;
