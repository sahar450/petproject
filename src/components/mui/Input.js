import React from "react";
import '../../assets/css/global.css';
import { styled } from "@mui/material/styles";
import {
  OutlinedInput,
  InputLabel,
  FormControl,
  InputAdornment,
  FormHelperText, Typography,

} from "@mui/material";

const CustomFormControl = styled(FormControl)(() => ({
  margin: "32px 0 0 0",
  maxWidth:"328px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#fff",
    fontFamily: "Yekan",
    fontSize: "16px",
    "& fieldset": {
      borderColor: "#889FA0",
      borderWidth: "1px",
    },
    "&:hover fieldset": {
      borderColor: "#009688",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#009688",
    },
    "& input": {
      fontFamily: "Yekan",
      fontSize: "16px",
      lineHeight: "24px",
      padding: "12px 14px",
    },
  },

  "& .MuiInputLabel-root": {
    color: "#00000099",
    fontSize: "16px",
    fontFamily: "Yekan",
    direction: "rtl",
    textAlign: "right",
    transformOrigin: "top right",
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "0.15px",
    right: 0,
    top: "-6px",
    left: "unset",
    transform: "translate(-14px, 16px) scale(1)",
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#009688",
    fontWeight: 400,
  },

  "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
    transform: "translate(-22px, -8px) scale(0.75)",
    textAlign: "center",
    top: "-2px",
  },

  "& .MuiOutlinedInput-notchedOutline legend": {
    textAlign: "right",
    width: "auto",
    marginRight: "6px",
    marginLeft: "unset",
  },

  "& .MuiFormHelperText-root": {
    fontFamily: "Yekan",
    fontSize: "14px",
    color: "#627B7C",
    textAlign: "left",
    marginTop: "4px",
  },

  "& .MuiOutlinedInput-root.Mui-error fieldset": {
    borderColor: "#d32f2f",

  },
  "& .MuiOutlinedInput-root.Mui-error.Mui-focused fieldset": {
    borderColor: "#d32f2f",
  },
  "& .MuiInputLabel-root.Mui-error": {
    color: "#d32f2f",
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: "#D32F2F",
    textAlign: "right",
    fontFamily: "Yekan",
    fontSize: "12px",
    marginRight: "15px",
  },
}));

export default function CustomInput({
  id,
  label = "ورودی",
  value,
  onChange,
  startText,
  type = "text",
  error,
  helperText,
  sx,
  ...props
}) {
  const isPhone = type === "phone";
  const hasError = Boolean(error);
  const helperId = id ? `${id}-helper-text` : undefined;

  return (
    <CustomFormControl
      variant="outlined"
      fullWidth
      sx={sx}
      dir="rtl"
      error={hasError}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>

      <OutlinedInput
        id={id}
        value={value}
        onChange={onChange}
        label={label}
        aria-describedby={helperId}

        sx={{
          "& input": {
            textAlign: isPhone ? "left" : "right",
            direction: isPhone ? "ltr" : "rtl",
          },
        }}
        endAdornment={
          isPhone && startText ? (
            <InputAdornment
              position="end"
              sx={{
                color: "#26A69A",
                fontFamily: "Yekan",
                fontSize: "16px",
              }}
            >
              <Typography sx={{ fontSize: "16px", fontFamily: "Yekan", color: "#627B7C" }}>
                {startText}
              </Typography>

            </InputAdornment>
          ) : null
        }
        {...props}
      />

      {typeof error === "string" ? (
        <FormHelperText id={helperId} error>
          {error}
        </FormHelperText>
      ) : null}

    </CustomFormControl>
  );
}
