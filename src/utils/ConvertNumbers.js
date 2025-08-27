export function convertEnglishDigitsToPersian(input) {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const englishDigits = '0123456789';
    return input.replace(/[0-9]/g, (d) => persianDigits[englishDigits.indexOf(d)]);
}

export function convertPersianToEnglishDigits(input) {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const englishDigits = '0123456789';
    return input.replace(/[۰-۹]/g, (d) => englishDigits[persianDigits.indexOf(d)]);
}
