import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import "./blogs.css";
// import "./privacypolicy.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "center",
  //   boxShadow: "none",
  color: theme.palette.text.secondary,
}));

export default function Blogs({ para1, mainimg, mainhead }) {
  return (
    <>
      <img src={mainimg} width="100%" height="200vh" />
      <p className="blogs_para">{para1}</p>
      <h4 className="blogs_head">{mainhead}</h4>
      <p className="blogs_para1">February 15, 2023 0 comments</p>
      <p className="blogs_par2">
        Originating in North America, quails are also found in Asia, Europe,
        Africa, Australia, and South America.
      </p>
      <button className="blogs_btn">CONTINUE READING</button>
    </>
  );
}
