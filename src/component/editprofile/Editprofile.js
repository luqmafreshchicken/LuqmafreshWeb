import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./editprofile.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CountryDetail,
  EditprofileUser,
  GetCountry,
  getUserID,
  viewProfile,
} from "../../serverRequest/Index";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Editprofile = ({ edit, edithandleClose }) => {
  let navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [flag, setFlag] = useState("");
  const [countryCode, setCountryCode] = useState("");



  

  useEffect(() => {
    // localContent();
    // window.scrollTo(0, 0);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position?.coords?.latitude) {
            GetCountry(
              position?.coords?.latitude,
              position?.coords?.longitude
            ).then((res) => {
              if (res?.address?.country) {
                CountryDetail(res?.address?.country).then((res) => {
                  // setCountry(res[0]?.name);
                  // setCountryCode(res[0]?.countryCode[0].code)
                  // setCountryCurrency(res[0]?.currencies[0]?.symbol);
                  // setCountryTitle(res[0]?.currencies[0]?.code);
                  setFlag(res[0]?.flags?.png);
                  setCountryCode(res[0]?.callingCodes[0]);


                });
              }
            });
          }
        },
        (error) => {
          console.error("Error retrieving location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
    // localContent();
    // showcart();
    // arrivalProductList();
    userDetail();
  }, []);

  const handleUpdate = async () => {
    if (!name || name == "" || name == null) {
      console.log("No Name");
      return false;
    }
    if (!mobile || mobile == "" || mobile == null) {
      console.log("No mobile");
      return false;
    }
    if (!gender || gender == "" || gender == null) {
      console.log("No Gender");
    }

    EditprofileUser(name, email, gender, mobile).then((res) => {
      if (res.status === true) {
        toast.success(res.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        if (isMobile) {
          navigate("/mobileaccount");
        } else {
          navigate("/account");
        }
        window.location.reload();
      } else {
        toast.error(res.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  useEffect(() => {
    userDetail();
  }, []);

  const userDetail = async () => {
    const UserId = await getUserID();
    viewProfile(UserId).then((res) => {
      if (res.status == true) {
        setEmail(res.data.email);
        setMobile(res.data.mobile.number);
        setName(res.data.name);
        setGender(res.data.gender);
      } else {
      }
    });
  };

  return (
    <div>
      <Modal
        open={edit}
        onClose={edithandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="editprofile_style">
          <div className="update_profile">
            <div
              style={{
                width: "87%",
                marginLeft: "3%",
                paddingTop: "22px",
              }}
            >
              <h5>Update Profile</h5>
            </div>
          </div>

          <div className="update_user_container">
            <label className="input_lable">Name</label>
            <div className="user_name_section">
              <input
                placeholder="Name..."
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <label className="input_lable">Mobile Number</label>

            <div className="user_mobile_section">
              <div className="user_mobile_content">
                <p>
                  {" "}
                  <img src={flag} /> +{countryCode}
                </p>
                <input
                  placeholder="Mobile Number..."
                  onChange={(e) => setMobile(e.target.value)}
                  value={mobile}
                />
              </div>
            </div>
            <label className="input_lable" style={{ marginTop: "1rem" }}>
              Email Id
            </label>

            <div className="user_name_section">
              <input
                placeholder="Email ID..."
                // onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={true}
              />
            </div>
            <div className="user_gender_section">
              <p>Gender</p>
              <div>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  value={gender}
                  onChange={handleChange}
                  className="user_gender"
                  // style={radioGroupStyle}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />

                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </div>
            </div>
            <div className="user_submit_btn" onClick={() => handleUpdate()}>
              <p>Submit</p>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Editprofile;
