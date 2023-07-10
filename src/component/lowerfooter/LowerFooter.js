import * as React from "react";
import Grid from "@mui/material/Grid";
import "./lowerfooter.css";
import { NavLink } from "react-router-dom";

export default function LowerFooter() {
  return (
    <Grid className="lower_footer_container">
      <div className="lowerfooter">
        <p>© 2023 luqmafresh.com All Rights Reserved</p>
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
    </Grid>
  );
}
