import * as React from "react";
import Grid from "@mui/material/Grid";
import "./lowerfooter.css";
import { NavLink } from "react-router-dom";

export default function LowerFooter() {
  return (
    <Grid className="lower_footer_container">
      <div className="lowerfooter">
        <div className="lower1">
          <p>© 2023 luqmafresh.com All Rights Reserved</p>
        </div>
        <div className="lower2">
          <p>
            Design and Developed by{" "}
            <NavLink
              to="https://designerbirds.com/"
              className="nav_list"
              style={{ color: "white", fontWeight: "bold" }}
            >
              designerbirds.com
            </NavLink>{" "}
            team
          </p>
        </div>
      </div>
    </Grid>
  );
}
