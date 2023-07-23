import React from "react";
import "./subcategorie.css";

const SubCategorieList = ({ img, name, id, onclick }) => {
  return (
    <div
      className="subcategorie_product_name_img"
      onClick={onclick}
      state={{ id: id }}
    >
    { /* <div className="subcategorie_product_img_comtainer">
        <img src={img} />
  </div>*/}
      <p>{name}</p>
    </div>
  );
};

export default SubCategorieList;
