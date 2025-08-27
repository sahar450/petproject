import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../../assets/css/Layout.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MedicalFolder, Syringe, Microscope, Stethoscope, Microbe } from '../../assets/icons/Icon';
import { Outlet } from "react-router-dom";
import ReusableAlert from '../../components/mui/Alerte';
import { war } from '../../assets/icons/Icon';
import { TickCircle } from 'iconsax-reactjs';
export default function Layout() {

    const [timer, setTimer] = useState(0);
    const timerRef = useRef(null);
    const [messageverfy, setmessageverfy] = useState('');
    const [messagesendOtp, setmessagesendOtp] = useState('');
    const startTimer = (valuetimer) => {
        clearInterval(timerRef.current);
        setTimer(valuetimer);
    };

    const stopTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setTimer(0);
    };

    useEffect(() => {
        if (timer > 0) {
            timerRef.current = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timerRef.current);
    }, [timer]);
    const Iconelements = [
        { id: 1, Icon: MedicalFolder },
        { id: 2, Icon: Syringe },
        { id: 3, Icon: Microscope },
        { id: 4, Icon: Stethoscope },
        { id: 5, Icon: Microbe },
    ];
    useEffect(() => {

        let t = 0;
        if (messageverfy) {
            setmessagesendOtp("");
        }
        const alerttimer = setInterval(() => {
            t += 1;
            if (t > 5) {
                setmessageverfy("");
                setmessagesendOtp("");
                clearInterval(alerttimer);
            }
        }, 1000);


        return () => clearInterval(alerttimer);
    }, [messageverfy, messagesendOtp]);



    return (

        <>
            <div className={styles["alert-layout"]}>


                {messageverfy ? (
                    <ReusableAlert
                        severity="error"
                        message={messageverfy}
                        icon={war}
                        bgColor="#FDEDED"
                        textColor="#5F2120"
                    />
                ) : (
                    messagesendOtp && (
                        <ReusableAlert
                            severity="success"
                            message="کد تایید جدید با موفقیت ارسال شد"
                            icon={<TickCircle size="20" color="#1E4620" />}
                            bgColor="#EDF7ED"
                            textColor="#2E7D32"
                        />
                    )
                )}

            </div>
            <Container fluid className="p-0">
                <Row className="g-0">

                    {/* right*/}
                    <Col
                        lg={7} md={8} sm={12} xs={12}
                        className={styles["right-layout"]}
                    >
                        <div className={styles["right-layout-box"]}>
                            {/* icons*/}
                            <div className={styles["right-layout-icon-box"]}>
                                {Iconelements.map(({ id, Icon }) => (
                                    <span key={id} className={styles["right-layout-icon-element"]}>
                                        {Icon}
                                    </span>
                                ))}
                            </div>
                            {/* dis*/}
                            <div className={styles["right-layout-dis-box"]}>
                                <h2 className={styles["right-layout-dis-box-title"]}>
                                    مراقبت هوشمندانه!
                                </h2>
                                <p>
                                    با ما، همیشه آماده‌ای تا بهترین مراقبت‌ها رو به دوست کوچیکت هدیه بدی.
                                </p>
                            </div>
                        </div>
                    </Col>

                    {/* left*/}
                    <Col
                        lg={5} md={4} sm={12} xs={12}
                        className={styles["left-backgrand"]}

                    >

                        <div className={styles["left-box"]}>
                            <h1 className={styles["left-box-title"]}>خوش آمدید!</h1>
                            <div className={styles["left-box-Nesting"]}>
                                <Outlet context={{
                                    startTimer, stopTimer, timer, messageverfy, setmessageverfy, setmessagesendOtp
                                }} />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
