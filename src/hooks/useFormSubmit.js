import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {convertPersianToEnglishDigits} from '../utils/ConvertNumbers';

export function useFormSubmit(startTimer, id = "1") {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    

    function validatePhone(valuee) {
        const englishValue = convertPersianToEnglishDigits(valuee);

        if (!/[0-9]/.test(englishValue)) {
            setError('لطفا عدد وارد کنید');
            return false;
        }

        const digits = englishValue.replace(/\D/g, '');
        const pattern = /^9\d{9}$/;

        if (!pattern.test(digits)) {
            setError('فرمت شماره معتبر نیست');
            return false;
        }

        setError('');
        return true;
    }

    async function submitPhone(value) {
        setLoading(true);
        const digitsphone = convertPersianToEnglishDigits(value).replace(/\D/g, '');
        console.log('Digits sent:', digitsphone);

        if (validatePhone(digitsphone)) {
            try {
                const res = await fetch('https://smartvet.futech-co.ir/api/auth/send-otp/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phone_number: digitsphone })
                });

                if (!res.ok) throw new Error('ارسال OTP ناموفق بود');

                const data = await res.json();
                startTimer(data.wait_time);
                setSuccessMessage('کد تایید با موفقیت ارسال شد!');
                console.log('OTP Response:', data);

                if (id === "1") {
                    navigate("/VerifyOTP", {
                        state: {
                            phoneEnglish: digitsphone,
                            phonePersian: value
                        }
                    });
                }

            } catch (err) {
                console.error('خطا:', err);
                setError('مشکلی در ارسال پیش آمد');
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }

    return { submitPhone, error, loading, successMessage };
}
