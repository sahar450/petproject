import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import '../../assets/css/global.css';
export default function ReusableAlert({
  severity = "success",
  message,
  icon,
  bgColor = "#f0fdf4",
  textColor = "#166534",
  defaultOpen = true,
  font = "Yekan",
  fontSize = "14px",
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapse in={open} timeout={0} unmountOnExit>
      <Alert
        dir="rtl"
        severity={severity}
        icon={icon ?? <ErrorOutlineRoundedIcon />}
        action={
          <IconButton
            aria-label="close"
            size="small"
            onClick={() => setOpen(false)}
            sx={{
              p: 0,
              "&:hover": { backgroundColor: "transparent" },
            }}
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        }
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: "12px",
          bgcolor: bgColor,
          color: textColor,
          fontFamily: font,
          fontSize,
          lineHeight: 1.9,

          pr: "16px",
          pl: "16px",
          py: "6px",


    
          position: { xs: "fixed", sm: "static" },
          top: { xs: "32px", sm: "auto" },
          left: { xs: "50%", sm: "auto" },
          transform: { xs: "translateX(-50%)", sm: "none" },
          width: { xs: "78%", sm: "auto" },
          textAlign: "center",
          zIndex: { xs: 1300, sm: "auto" },

          "& .MuiAlert-icon": {
            color: severity === "error" ? "#d32f2f" : "#16a34a",
            mr: "14px",
            ml: "13px",
            p: 0,
            m: 0,

          },

          "& .MuiAlert-message": {
            flex: 1,
           
            whiteSpace: "normal",  
            my: "8px",
            mr: "13px",
            ml: "21px",
            p: 0,
            flex: 1,

          },

          "& .MuiAlert-action": {
            m: 0,
            p: 0,
            ml: 0,
            pl: "6px",
            display: "flex",
            alignItems: "center",
            flexShrink: 0,

          },
        }}
      >
        {message}
      </Alert>
    </Collapse>
  );
}
