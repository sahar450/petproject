export function isValidIranianNationalCode(input) {
  if (!/^\d{10}$/.test(input)) return false;
  if (/^(\d)\1{9}$/.test(input)) return false;
  const check = +input[9];
  const sum =
    input
      .split("")
      .slice(0, 9)
      .reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;

  return sum < 2 ? check === sum : check + sum === 11;
}

export function RegistrationValidation({ fullname, ssn, role }) {
  let errors = {};

  if (!fullname.trim()) {
    errors.fullname = "نام و نام خانوادگی الزامی است";
  } else if (!/^[\u0600-\u06FFa-zA-Z\s]+$/.test(fullname)) {
    errors.fullname = "نام و نام خانوادگی نباید شامل عدد یا کاراکتر غیرمجاز باشد";
  } else if (fullname.trim().length <= 1) {
    errors.fullname = true;
  }

  if (!ssn.trim()) {
    errors.ssn = "کد ملی الزامی است";
  } else if (!isValidIranianNationalCode(ssn)) {
    errors.ssn = "کد ملی معتبر نیست";
  }

  if (!role.trim()) {
    errors.role = "انتخاب نقش الزامی است";
  }

  return errors;
}
