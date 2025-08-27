import React, { useRef } from 'react';
import { Box, styled } from '@mui/system';
import '../../assets/css/global.css';
const InputElement = styled('input')(({ theme }) => ({
  width: "40px",
  height: "40px",
  fontSize: "16px",
  fontFamily: "Yekan",
  textAlign: "center",
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "8px 0",
  "&:focus": {
    borderColor: "#009688",
    outline: "none",
  },
}));

export default function OTP({ length = 5, value, onChange, separator = <span></span>, sx, ...props }) {
  const inputRefs = useRef([]);

  const focusInput = (index) => {
    if (inputRefs.current[index]) inputRefs.current[index].focus();
  };

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 1);
    const newOtp = [...value];
    newOtp[index] = val;
    onChange(newOtp);
    if (val && index < length - 1) focusInput(index + 1);
  };

  const handleKeyDown = (e, index) => {
    const newOtp = [...value];
    if (e.key === 'Backspace') {
      e.preventDefault();
      newOtp[index] = '';
      onChange(newOtp);
      if (index > 0) focusInput(index - 1);
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      focusInput(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      focusInput(index + 1);
    }
  };

  const handlePaste = (e, index) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text/plain').replace(/\D/g, '');
    const newOtp = [...value];
    for (let i = 0; i < paste.length && index + i < length; i++) {
      newOtp[index + i] = paste[i];
    }
    onChange(newOtp);
    focusInput(Math.min(index + paste.length, length - 1));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: { xs: "6px", sm: "6px", md: "6px", lg: "6px" },
        mt: { xs: "32px", sm: "32px", md: "32px", lg: "32px" },
        direction: "ltr",
      }}
    >
      {Array.from({ length }).map((_, i) => (
        <React.Fragment key={i}>
          <InputElement
            value={value[i] || ''}
            ref={(el) => (inputRefs.current[i] = el)}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={(e) => handlePaste(e, i)}
            maxLength={1}
            style={sx}
          />
          {i < length - 1 ? separator : null}
        </React.Fragment>
      ))}
    </Box>
  );
}
