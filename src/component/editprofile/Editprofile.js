import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Input from "../../customcomponent/input/Input";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./editprofile.css";
import { EditprofileUser } from "../../serverRequest/Index";

const Editprofile = ({ edit, edithandleClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("male");
  const [image, setImage] = useState("");
  const InputRef = useRef(null);

  const handleImageClick = () => {
    InputRef.current.click();
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpdate = async () => {
    if (!name || name == "" || name == null) {
      console.log("No Name");
      return false;
    }
    if (!email || email == "" || email == null) {
      console.log("No Email");
      return false;
    }
    if (!gender || gender == "" || gender == null) {
      console.log("No Gender");
    }
    if (!image || image == "" || image == null) {
      console.log("No Image");
    }
    const user = await EditprofileUser(name, email, gender, image);
    console.log(user);
  };

  const handleChange = (event) => {
    setGender(event.target.value);
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
          <div className="edit_picture">
            <img
              src={image}
              height="50%"
              width="20%"
              style={{ borderRadius: 50 }} 
              onChange={(e) => setImage(e.target.value)}
              value={image}
              className="user_profile_img"
            />
            <img
              src="camera.png"
              className="camera_img"
              onClick={handleImageClick}
            />
            <input
              accept="image/*"
              type="file"
              ref={InputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
          <div className="all_mandatory">
            <p>* All the following details are mandatory</p>
          </div>
          <label className="input_lable">Name</label>
          <div className="user_name_section">
            <input
              placeholder="Name..."
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <label className="input_lable">Mobile Number</label>

          <div className="user_name_section">
            <input
              placeholder="Mobile Number..."
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
            />
          </div>
          <label className="input_lable">Email Id</label>

          <div className="user_name_section">
            <input
              placeholder="Email ID..."
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="user_gender_section">
            <p>Gender</p>
            <div className="user_gender">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={gender}
                onChange={handleChange}
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
        </Box>
      </Modal>
    </div>
  );
};

export default Editprofile;
