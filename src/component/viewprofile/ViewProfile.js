import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./viewprofile.css";
import Editprofile from "../editprofile/Editprofile";
import { viewProfile, getUserID } from "../../serverRequest/Index";

const ViewProfile = ({ profile, viewhandleClose }) => {
  const [edit, setEdit] = useState(false);
  const [viewUser, setViewUser] = useState([]);

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

  const edithandleOpen = () => setEdit(true);
  const edithandleClose = () => setEdit(false);
  return (
    <div>
      <Modal
        open={profile}
        onClose={viewhandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="viewprofile_style">
          <div className="my_profile">
            <div
              style={{
                width: "87%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginLeft: "3%",
                paddingTop: "22px",
              }}
            >
              <h5>My Profile</h5>
              <span onClick={edithandleOpen}>Edit</span>
            </div>
          </div>
          {/* information_section */}
          <div className="information_container">
            <div className="profile_picture">
              <img src={viewUser.profile} height="50%" width="22%" />
            </div>
            <div className="basic_information">
              <p>Basic Information</p>
            </div>
            {/* first_name */}
            <div className="first_name">
              <span>
                Name <br />
                <p>{viewUser.name}</p>
              </span>
            </div>
            {/* mobile_no */}

            <div className="first_name">
              <span>
                Mobile No <br />
                <p>+91 {viewUser?.mobile?.number}</p>
              </span>
            </div>
            {/* email_id */}

            <div className="first_name">
              <span>
                Email ID <br />
                <p>{viewUser.email}</p>
              </span>
            </div>
            {/* gender */}

            <div className="first_name">
              <span>
                Gender <br />
                <p>{viewUser.gender}</p>
              </span>
            </div>
            {/*  Marital_status */}

            <div className="first_name">
              <span>
                Marital status <br />
                <p>Single</p>
              </span>
            </div>
          </div>
        </Box>
      </Modal>
      <Editprofile edit={edit} edithandleClose={edithandleClose} />
    </div>
  );
};

export default ViewProfile;
