import React, { useEffect } from "react";
import "./account.css";
import List from "./Accountlist";
import ViewProfile from "../viewprofile/ViewProfile";
import { useState } from "react";
import Orderhistory from "../orderhistory/Orderhistory";
import Header from "../header/Header";
import { viewProfile, getUserID } from "../../serverRequest/Index";
import Notification from "../notification/Notification";

const Account = () => {
  const [profile, setProfile] = useState(false);
  const [open, setOpen] = useState(0);
  const [viewUser, setViewUser] = useState([]);

  const handleOpen = () => {
    if (open === 0) {
      return <Orderhistory />;
    }if (open === 4) {
      return <Notification/>
    } 
  };
  useEffect(() => {
    userDetail();
  }, []);

  const userDetail = async () => {
    const UserId = await getUserID();
    viewProfile(UserId).then((res) => {
      if (res.status == true) {
        setViewUser(res.data);
      } else {
      }
    });
  };
  const viewhandleOpen = () => setProfile(true);
  const viewhandleClose = () => setProfile(false);
  return (
    <>
      <div className="account_header">
        <Header />
      </div>
      <div className="account_section" >
        <div className="account_content" >
          <div className="account_text">
            <h3>{viewUser.name}</h3>
            <div className="account_profile">
              <p>
                +91 {viewUser?.mobile?.number} | {viewUser.email}
              </p>
              <span onClick={viewhandleOpen}>View profile</span>
            </div>
          </div>
          <div className="account_banner">
            <img src="BANNERS.JPEG" />
          </div>
          {/* show data */}
          <div className="account_list_section">
            <div className="account_list_show">
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                }}
              >
                {List.map((list, index) => (
                  <l1
                    style={{
                      listStyle: "none",
                      color: "black",
                      fontWeight: 600,
                      fontSize: "17px",
                      paddingTop: "10px",
                    }}
                  >
                    <div
                     
                      className="hover_bottom"
                      onClick={() => setOpen(index)}
                    >
                      {list.routeName}
                    </div>
                  </l1>
                ))}
              </ul>
            </div>
            <div className="show_data">{handleOpen(open)}</div>
          </div>
          {/* end show data */}
        </div>
        <ViewProfile profile={profile} viewhandleClose={viewhandleClose} />
      </div>
    </>
  );
};

export default Account;
