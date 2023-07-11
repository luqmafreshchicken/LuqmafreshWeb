import React, { useEffect, useState } from "react";
import "./usercontact.css";
import Input from "../../customcomponent/input/Input";
import Button from "../../customcomponent/button/Button";
import Steps from "../../customcomponent/steps/Steps";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createAddress, getUserID } from "../../serverRequest/Index";
import Header from "../../component/header/Header";
import { useNavigate } from "react-router-dom";

const UserContactDetail = () => {
 

  let navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [address1, setAddress1] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");

  const [userId, setUserId] = useState("");

  useEffect(() => {
    getUserID().then((res) => {
    });
  });

  const handleCreateAdd = async () => {
    const id = await getUserID();
    // console.log(id) ispe set h id isko use kar lo jha v jarurat padega

    const requestData = {
      userId: id,
      address: address,
      address1: address1,
      landmark: landmark,
      city: city,
      mobile: mobile,
      email: email,
      name: fullName,
      latitude: "60.2334434",
      longitude: "12.464574747",
      type: "Office",
    };
    createAddress(requestData).then((res) => {
      console.log(res.message);
      if (res.status == true) {
        toast.success(res.message + 'Successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/addnewaddress");
      }else{
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

  return (
    <>
    <Header/>
    <div className="main_usercontact">
      <div className="main_user_contact_location">
        {/* contact page */}
        <div className="user_contact_location">
          <div className="user_contact_detail">
            <Input
              lable="Search for Area/Locality"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Input
              lable="Flat No/Building Name/Street Name"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
            />
            <Input
              lable="Landmark"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
            <Input
              lable="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Input
              lable="Mobile No"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <Input
              lable="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              lable="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Button onclick={() => handleCreateAdd(userId)} />
          </div>
          <div className="user_contact_location_steps">
          <Steps img1="radio.png" img2="radio.png" img3="radio.png" />

          </div>
        </div>
        {/* end contact page */}
       
      </div>
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <ToastContainer />
    </div>
    </>
  );
};

export default UserContactDetail;




