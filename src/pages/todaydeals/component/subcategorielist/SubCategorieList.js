import React from "react";
import "./subcategorie.css";

const SubCategorieList = ({ img, name, id, onclick }) => {
  return (
    <div
      className="subcategorie_product_name_img"
      onClick={onclick}
      state={{ id: id }}
    >
      <img src={img} />
      <p>{name}</p>
    </div>
  );
};

export default SubCategorieList;

