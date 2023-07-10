import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./input.css";

const Input = ({ lable, onChange, value , id , name}) => {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
      }}
      noValidate
      autoComplete="off"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "66px",
      }}
    >
      <TextField
        id={id}
        name={name}
        label={lable}
        variant="outlined"
        className="input_text"
        onChange={onChange}
        value={value}
      />
    </Box>
  );
};

export default Input;
