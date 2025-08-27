import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export function useSendVerifyOtp() {
    const navigate = useNavigate();
    const [senderror, setsendError] = useState('');
    const [sending, setSending] = useState(false);

    async function Sendcode(phonenumber, code) {
        const digitsphone = phonenumber.replace(/\D/g, '');
        const cleancode = code.join("");
        console.log(cleancode);
        setsendError('');
        setSending(true);

        try {
            const res = await fetch("https://smartvet.futech-co.ir/api/auth/verify-otp/", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone_number: digitsphone, otp: cleancode })
            });

            const verifyinfo = await res.json();
            console.log("verifyinfo:", verifyinfo);

            if (res.ok) {
                setsendError('');
                navigate("/Register");
            } else {
                const errorMsg =
                    (verifyinfo.non_field_errors && verifyinfo.non_field_errors[0]) ||
                    verifyinfo.message ||
                    "کد وارد شده اشتباه است";
                setsendError(errorMsg);
            }

        } catch (err) {
            console.error('خطا:', err);
            setsendError(' خطا در برقراری ارتباط  ');
        } finally {
            setSending(false);
        }
    }

    return { Sendcode, senderror, sending };
}
