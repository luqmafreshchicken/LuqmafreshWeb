import React from "react";
import "./whistlistdetail.css";
import WhistListComponent from "../../customcomponent/whistlistcomponent/WhistListComponent";
import { useState } from "react";
import { useEffect } from "react";
import {
  showWhistListUserId,
  getUserID,
  deleteVistList,
} from "../../serverRequest/Index";
import Loader from "../loder/Loader";
import { ToastContainer, toast } from "react-toastify";

const WhistListDetail = () => {
  const [showList, setShowList] = useState([]);
  const [removeList, setRemoveList] = useState("");

  const [load, setload] = useState(false);

  useEffect(() => {
    handleShowList();
  }, []);

  const handleShowList = async () => {
    setload(true);
    const userId = await getUserID();
    const data = {
      userId: userId,
    };
    const res = await showWhistListUserId(data);
    if (res.status == true) {
      setShowList(res.data);
      setload(false);
    } else {
    }
  };
  const handleListDelete = async (id) => {
    setload(true);
  
    const userId = await getUserID();
    const data = {
      userId: userId,
      productId: id,
    };
    const res = await deleteVistList(data);
    if (res.status == true) {
      toast.success(res.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      handleShowList()
      setload(false);
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
  };
  return (
    <div>
      {/* ***past heading*** */}
      <div className="whist_list_heading_container">
        <h5>WhistList Detail</h5>
      </div>
      {/* end past heading */}
      {showList.map((list) => (
        <WhistListComponent
          name={list.productId?.name}
          qty={list.productId?.quantity}
          unit={list.productId?.unit}
          price={list.productId?.price}
          dis={list.productId?.discount}
          ogp={list.productId?.originalPrice}
          img={list.productId?.image}
          onclick={() => handleListDelete(list.productId?._id)}
        />
      ))}
      <Loader loading={load} />
    </div>
  );
};
export default WhistListDetail;
