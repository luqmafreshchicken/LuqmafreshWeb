import React, { useEffect, useState } from "react";
import "./mobilecategorie.css";
import { productCategorie } from "../../serverRequest/Index";
import { getAllSubcategoryByCategoryId } from "../../serverRequest/Index";
import { useLocation } from "react-router-dom";
import Loader from "../../component/loder/Loader";

const MobileCategorie = () => {

  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [showText, setShowText] = React.useState(false);
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');


  useEffect(() => {
    setLoad(true);
    async function getData(res) {
      const newData = await productCategorie();
      setData(newData.data);
    }
    getData();
    const timer = setTimeout(() => {
      setLoad(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  //   useEffect(() => {
  //     handle();
  //   }, []);

  const handle = (id) => {
    setShowText(!showText);
  };

  return (
    <div className="mobile_categorie">
      {/* heading */}
      <div className="mobile_All_categorie">
        <h5>All Categories</h5>
      </div>
      {/* end heading */}

      {data.map((item) => (
        <div className="mobile_single_list">
          {/* list 1 */}
          <div className="mobile_categorie_container">
            <div className="mobile_categorie_box">
              <div className="mobile_categorie_image">
                <img src={item.categoryImage} />
              </div>
              <div className="mobile_categorie_name">
                <p>{item.categoryName}</p>
              </div>
              {id === "" ? (
                <div className="mobile_categorie_arr">
                  <img src="down (2).png" onClick={()=>{setShow(true); setId(item._id)}} />
                </div>
              ) : null}

              {id != "" ? (
                <div className="mobile_categorie_arr">
                  <img
                    src="upload.png"
                    style={{ height: "14px", width: "14px" }}
                    onClick={()=>setId('')}
                  />
                </div>
              ) : null}
            </div>
            {item._id === id  ? (
              <div className="mobile_subcategory">
                {item?.subcategories.map((item) => (
                  <div className="mobile_subcategory_container">
                  
                    <div className="mobile_subcategory_para">
                      <p>{item.subcategoryName}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          {/* end list 1 */}
        </div>
      ))}
      <Loader loading={load} />
    </div>
  );
};

export default MobileCategorie;
