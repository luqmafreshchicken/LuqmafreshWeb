import React from "react";
import "./whistlistdetail.css";
const WhistListDetail = () => {
  return (
    <div>
      {/* ***past heading*** */}
      <div className="whist_list_heading_container">
        <h5>WhistList Detail</h5>
      </div>
      {/* end past heading */}
      {/* order list */}
      <div className="whist_list_detail_container">
        <div className="whist_list_image"></div>
        <div className="whist_list_text">
          <div className="whist_list_text_name">
          <p>Spreads & Cold Cuts - isko hata do..</p>
          </div>
          <div className="whist_list_text_qty">
            <p>2242</p>
            <p>2242</p>
            <p>2242</p>
            <p>2242</p>

          </div>
        </div>
        <div className="whist_list_addtocart"></div>
      </div>
      {/* end end list */}
    </div>
  );
};
export default WhistListDetail;
