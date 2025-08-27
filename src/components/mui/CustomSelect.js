import React from "react";
import '../../assets/css/global.css';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomFormControl = styled(FormControl)(() => ({
    margin: "12px 0px 0px 0px",
    maxWidth:"328px",
    "& .MuiOutlinedInput-root": {

        borderRadius: "8px",
        "& fieldset": {
            borderColor: "#889FA0",
            borderWidth: "1px",
        },
        "&:hover fieldset": {
            borderColor: "#26A69A",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#26A69A",
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

        right: 0,
        top: "-6px",
        left: "unset",
        transform: "translate(-14px, 16px) scale(1)",
    },
    "& .MuiOutlinedInput-input": {
        paddingRight: "10px !important",
        color: "#000000",
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
    "& .MuiMenuItem-root": {
        fontFamily: "Yekan !important",
        textAlign: "right",
        direction: "rtl",
        color: "#000000DE !important"
    }
    ,
    "& .MuiSelect-select": {

        textAlign: "right",
        fontSize: "16px",
        direction: "rtl",
        color: "#000000DE !important",
        padding: "10px !important",
        minHeight: "0 !important",
        lineHeight: "1.5 !important",
    },
    "& .MuiSelect-icon": {
        right: "auto",
        left: "7px",

    },
}));

const CustomMenuItem = styled(MenuItem)({
    fontFamily: "Yekan, sans-serif",
    fontSize: "16px",
    textAlign: "right",
    direction: "rtl",
    color: "#000000DE",
    "&:hover": {
        backgroundColor: "#E0F2F1 !important",
    },

});

export default function CustomSelect({
    label,
    value,
    onChange,
    options = [],
    sx,
    ...props
}) {

    const defaultValue = value || (options.length > 0 ? options[0].value : "");

    return (
        <CustomFormControl variant="outlined" fullWidth sx={sx} {...props}>
            <InputLabel>{label}</InputLabel>
            <Select
                value={defaultValue}
                onChange={onChange}
                label={label}
                {...props}
            >
                {options.map((opt) => (
                    <CustomMenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </CustomMenuItem>
                ))}
            </Select>
        </CustomFormControl>
    );
}
