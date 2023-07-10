import * as React from "react";
import { NavLink } from "react-router-dom";
import "./categorie.css";

const CategorieCard = ({ text, img, height, width, today, id, onclick }) => {
  return (
    <div className="categorie_card" onClick={onclick}>
      <NavLink to={today} style={{ textDecoration: "none" }} state={{ id: id }}>
        <div className="categorie_image">
          <img src={img} height={height} width={width} />
        </div>
        <div className="categorie_text">
          <p>{text}</p>
        </div>
      </NavLink>
    </div>
  );
};

export default CategorieCard;
