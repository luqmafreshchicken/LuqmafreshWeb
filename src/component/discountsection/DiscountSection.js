import React, { useEffect, useState } from "react";
import Discount from "../../customcomponent/discount/Discount";
import "./discountsection.css";
import { todayDeals } from "../../serverRequest/Index";

const DiscountSection = () => {
  const [today, setToday] = useState([]);

  useEffect(() => {
    async function today() {
      const newData = await todayDeals();
      setToday(newData.data);
    }
    today();
  }, []);
  return (
    <div className="main_discountsection">
      <div className="submain_discountsection">
        {today.map((deals) => (
          <Discount
            bgColor={deals.color}
            src={deals.image}
            percen={deals.discount}
            text={deals.dealsName}
            radius="100px"
            br="25px"
          />
        ))}

        <Discount
          bgColor="#C42118"
          src="Eggs.png"
          percen="40"
          text="On Mutton"
          br="25px"
        />
      </div>
    </div>
  );
};

export default DiscountSection;
