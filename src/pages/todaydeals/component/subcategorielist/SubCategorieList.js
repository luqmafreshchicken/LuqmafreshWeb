import React from "react";
import "./subcategorie.css";

const SubCategorieList = ({ img, name, id, onclick,selID,catId }) => {
  return (
    <div
      className="subcategorie_product_name_img"
      onClick={onclick}
      state={{ id: id }}
    >
      {/* <div className="subcategorie_product_img_comtainer">
        <img src={img} />
  </div>*/}
      <p style={{color:selID == catId ? 'white' : 'white', backgroundColor:selID == catId ? '#000' : '#ffbd31', padding:selID == catId ? '0.5rem 1rem' : '0.5rem 1rem', borderRadius:selID == catId ? '5px' : '5px' }}>{name}</p>
      {/* <p className={selID == catId ? 'activeclass' : 'black'}>{name}</p> */}

    </div>
  );
};

export default SubCategorieList;
