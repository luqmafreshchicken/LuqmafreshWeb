import React from "react";
import "./notification.css";
import { useEffect } from "react";
import { useState } from "react";
import { getUserID, showNotification } from "../../serverRequest/Index";
import moment from "moment/moment";
import Loader from "../loder/Loader";
const Notification = () => {
  const [notification, setNotification] = useState([]);
  const [load, setLoad] = useState([]);

  useEffect(() => {
    notiList();
  }, []);

  const notiList = async () => {
    setLoad(true);
    const UserId = await getUserID();
    const res = await showNotification(UserId);
    if (res.status == true) {
      setNotification(res?.data);
      setLoad(false);
    } else {
      setLoad(false);
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
            <p>{list?.message}</p>
            <span>{moment(list?.createdAt).format("DD/MM/YYYY")}</span>
          </div>
        ))}
      </div>
      <Loader loading={load} />
    </div>
  );
};

export default Notification;
