import React, { useState } from "react";
import CustomInput from "../../components/mui/Input";
import CustomButton from "../../components/mui/Butoon";
import { Container, Row, Col } from "react-bootstrap";
import CustomSelect from "../../components/mui/CustomSelect";
import { useNavigate } from "react-router-dom";
import { RegistrationValidation } from "../../utils/Validation";
import { convertEnglishDigitsToPersian, convertPersianToEnglishDigits } from "../../utils/ConvertNumbers";

export default function Register() {
  const [fullname, setUserName] = useState("");
  const [ssn, setssn] = useState("");
  const [role, setRole] = useState("");
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleFullnameChange = (value) => {
    setUserName(value);
    setTouched((prev) => ({ ...prev, fullname: true }));
  };

  const handleSsnChange = (value) => {
    if (/^[0-9۰-۹]*$/.test(value)) {
      const englishValue = convertPersianToEnglishDigits(value);
      setssn(englishValue);
      setTouched((prev) => ({ ...prev, ssn: true }));
    }
  };

  const isAllFilled = fullname.trim() && ssn.trim() && role.trim();
  const errors = RegistrationValidation({ fullname, ssn, role });

  const handleSubmit = () => {
    setSubmitted(true);
    if (Object.keys(errors).length === 0) {
      console.log("اطلاعات معتبر:", { fullname, ssn, role });
    } else {
      console.log("خطاها:", errors);
    }
  };

  const handleExit = () => {
    navigate("/");
  };

  return (
    <Container>
      <Row>
        <Col>
          <CustomInput
            label="نام و نام خانوادگی"
            type="text"
            value={fullname}
            onChange={(e) => handleFullnameChange(e.target.value)}
            onBlur={() => setTouched({ ...touched, fullname: true })}
            error={(submitted || touched.fullname) ? errors.fullname : false}
            sx={{ margin: "0px 0px 12px 0px" }}
          />

          <CustomInput
            label="کد ملی"
            type="phone"
            value={convertEnglishDigitsToPersian(ssn)}
            onChange={(e) => handleSsnChange(e.target.value)}
            onBlur={() => setTouched({ ...touched, ssn: true })}
            inputProps={{ maxLength: 10 }}
            error={(submitted || touched.ssn) ? errors.ssn : false}
            sx={{ margin: "12px 0" }}
          />

          <CustomSelect
            label="نقش"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setTouched((prev) => ({ ...prev, role: true }));
            }}
            onBlur={() => setTouched({ ...touched, role: true })}
            options={[
              { value: "petOwner", label: "صاحب پت" },
              { value: "vet", label: "دامپزشک" },
              { value: "shop", label: "فروشگاه" },
            ]}
            error={(submitted || touched.role) ? errors.role : false}
            sx={{ margin: "12px 0" }}
          />

          <CustomButton
            onClick={handleSubmit}
            disabled={!isAllFilled}
            sx={{ marginTop: "12px" }}
          >
            ثبت نام
          </CustomButton>

          {Object.keys(errors).length === 0 && submitted && (
            <CustomButton
              onClick={handleExit}
              variant="outlined"
              color="secondary"
              sx={{
                marginTop: "16px",
                backgroundColor: "#fff",
                color: "#00796B",
                border: "1px solid #00796B",
              }}
            >
              خروج
            </CustomButton>
          )}
        </Col>
      </Row>
    </Container>
  );
}
