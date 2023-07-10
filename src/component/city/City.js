import React, { useEffect, useState } from "react";
import "./city.css";
import { areaWeServe } from "../../serverRequest/Index";

const City = () => {
  const [city, setCity] = useState([]);

  useEffect(() => {
    async function getData() {
      const newData = await areaWeServe();
      setCity(newData.data);
    }
    getData();
  }, []);
  return (
    <>
      <div className="maincity">
        <div className="subcity">
          <h5>AREAS WE SERVE</h5>
          <div
            className="location_text"
          >
            {city.map((area) => (
              <p
                style={{ marginRight: "1rem" }}
                className="para_city"
                floatLabelType="auto"
                multiline={true}
              >
                {area.areaName}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default City;
