import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import '../../assets/css/global.css';

const BaseButton = styled(Button)(({ theme }) => ({
  borderRadius: "100px",
  textTransform: "none",
  padding: "0px 20px",
  fontWeight: 500,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  height: "44px",
  margin: "24px auto 0 auto", 
  fontFamily: "Yekan",
  fontSize: "14px",
  transition: "0.3s all",
  backgroundColor: "#009688",
  color: "#fff",
  width: "98%",
  maxWidth: "328px", 
  "&.Mui-disabled": {
    backgroundColor: "#0000001F",
    color: "#00000061",
    cursor: "not-allowed",
  },
}));

export default function CustomButton({ children, sx, ...props }) {
  return (
    <BaseButton disableRipple sx={sx} {...props}>
      {children}
    </BaseButton>
  );
}
