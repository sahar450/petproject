import React, { useState, useEffect } from "react";
import PhoneInput from '../../components/mui/Input';
import { useFormSubmit } from "../../hooks/useFormSubmit";
import CustomButton from '../../components/mui/Butoon';
import { Container, Row, Col } from 'react-bootstrap';
import { useOutletContext, useLocation } from "react-router-dom";
import OTP from "../../components/mui/otp";
import { useSendVerifyOtp } from "../../hooks/useSendVerifyOtp";
import '../../assets/css/global.css';
export default function VerifyOTP() {
    const { startTimer, stopTimer, timer, messageverfy, setmessageverfy, setmessagesendOtp } = useOutletContext();
    const { submitPhone, error, loading } = useFormSubmit(startTimer, "2");
    const { Sendcode, senderror, sending } = useSendVerifyOtp();
    const location = useLocation();
    const { phoneEnglish, phonePersian } = location.state;
    const length = 5;
    const [otp, setOtp] = useState(Array(length).fill(''));
    useEffect(() => {
        if (senderror) {
            setmessageverfy(senderror);
        }
    }, [senderror]);
    const isValid = otp.every(digit => digit !== '');
    const canResend = timer === 0;

    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, '0')}`;
    }

    const handleResend = () => {
        if (phoneEnglish) {
            submitPhone(phoneEnglish);
        }
    };

    const Validation = () => {
        setmessageverfy("");
        Sendcode(phoneEnglish, otp);
    };

    return (
        <Container>
            <Row>
                <Col lg={12} md={12} xs={12} ms={12}>

                    <div>
                        <span className="txt-dis-log">
                            کد ارسال شده به شماره <span className="txt-dis-log-num" > ۹۸+ {phonePersian} </span> را وارد کنید



                        </span>
                    </div>

                    <div>
                        <OTP
                            length={length}
                            value={otp}
                            onChange={setOtp}
                            separator={<span style={{ width: 8 }}></span>}
                            {...(senderror ? { sx: { border: "1px solid red", borderRadius: "4px" } } : {})}


                        />
                        <div>
                            {error && <span className="txt-error">{error}</span>}
                            {senderror && <span className="txt-error ">{senderror}</span>}
                        </div>
                        <CustomButton
                            type="submit"
                            disabled={!isValid || sending}
                            onClick={Validation}
                        >
                            {loading ? "در حال ارسال..." : "اعتبار سنجی"}
                        </CustomButton>

                        <CustomButton
                            type="button"
                            disabled={!canResend}
                            onClick={handleResend}
                        >
                            {canResend ? "ارسال مجدد" : `ارسال مجدد (${formatTime(timer)})`}
                        </CustomButton>
                    </div>


                </Col>
            </Row>
        </Container>
    );
}
