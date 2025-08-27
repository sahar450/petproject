import React, { useState, useEffect } from "react";
import CustomInput from '../../components/mui/Input';
import CustomButton from '../../components/mui/Butoon';
import { Container, Row, Col } from 'react-bootstrap';
import { useOutletContext } from "react-router-dom";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import '../../assets/css/global.css';
import { convertEnglishDigitsToPersian, convertPersianToEnglishDigits } from '../../utils/ConvertNumbers';
export default function SendOtp() {
    const [phone, setPhone] = useState("");
    const { startTimer, setmessagesendOtp } = useOutletContext();
    const { submitPhone, error, loading, successMessage } = useFormSubmit(startTimer);
    const [errorinput, seterrorinput] = useState("");



    const iranPhoneRegex = /^9[0-9]{9}$/;

    const handleChange = (e) => {
        let value = e.target.value;

        seterrorinput("");

        let digits = convertEnglishDigitsToPersian(value);
        let digitsEnglish = convertPersianToEnglishDigits(digits).replace(/\s/g, "");


        if (/[^0-9]/.test(digitsEnglish)) {
        
            seterrorinput(true);
        } else if (digitsEnglish.startsWith("0")) {
            
            seterrorinput("شماره نباید با صفر شروع شود");
        } else if (digitsEnglish.length === 10 && !iranPhoneRegex.test(digitsEnglish)) {
            seterrorinput("شماره موبایل معتبر نیست");
        } else {
            seterrorinput(false);
        }



        const formatted = digitsEnglish
            .replace(/(\d{3})(\d{3})(\d{0,4})/, "$1 $2 $3")
            .trim();

        const formattedPersian = convertEnglishDigitsToPersian(formatted);

        setPhone(formattedPersian);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        submitPhone(phone);
    };

    const phoneLength = phone.replace(/\s/g, '').length;
    const isValid = phoneLength === 10;

    useEffect(() => {
        if (successMessage) {
            setmessagesendOtp(successMessage);
        }
    }, [successMessage, setmessagesendOtp]);

    return (
        <Container>
            <Row>
                <Col>
                    <div>
                        <div>
                            <span className="txt-dis-log">
                                لطفا شماره تماس خود را در کادر زیر وارد کنید
                            </span>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <CustomInput
                                label="شماره تماس"
                                type="phone"
                                error={errorinput}
                                value={phone}
                                startText="۹۸+ "
                                onChange={handleChange}
                            />

                            {error && <div className="txt-error">{error}</div>}
                            {successMessage && <div className="txt-success">{successMessage}</div>}

                            <CustomButton type="submit" disabled={!isValid || loading}>
                                {loading ? "در حال ارسال..." : "ارسال کد تایید"}
                            </CustomButton>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
