let booking__form__name = document.querySelector('.booking__form__name')
let booking__form__email = document.querySelector('.booking__form__email')
let booking__form__phone = document.querySelector('.booking__form__phone')



const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;

const isEmailValid = (email) => {
    const re = /^[\w-]{3,15}@[\w]{4,}\.[\w-]{2,}$/g;
    return re.test(email);
};

const isPhoneValid = (phone) => {
    const re = /^[0-9]{2,3}((([0-9]){1,})$|((\s[0-9]{2,3}){1,})$|((-[0-9]{2,3}){1,})$)/gm;
    return re.test(phone);
};
const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}
const checkUsername = () => {

    let valid = false;
    const min = 3,
        max = 15;
    const username = booking__form__name.value.trim();

    if (!isRequired(username)) {
        showError(booking__form__name, 'Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(booking__form__name, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(booking__form__name);
        valid = true;
    }
    return valid;
}
const checkEmail = () => {
    let valid = false;
    const email = booking__form__email.value.trim();
    if (!isRequired(email)) {
        showError(booking__form__email, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(booking__form__email, 'Email is not valid. It should be "abc@defg.hk"')
    } else {
        showSuccess(booking__form__email);
        valid = true;
    }
    return valid;
}
const checkPhone = () => {
    let valid = false;
    const min = 3,
        max = 10;
    const phone = booking__form__phone.value.trim();
    let cleanNumber = phone.split('').filter(el => el != ' ' && el != '-').join('')

    if (!isRequired(phone)) {
        showError(booking__form__phone, 'phone cannot be blank.');
    } else if (!isPhoneValid(phone)) {
        showError(booking__form__phone, 'phone is not valid')
    } else if (!isBetween(cleanNumber.length, min, max)) {
        showError(booking__form__phone, `phone must be between ${min} and ${max} characters except "-" and space.`)
    }

    else {
        showSuccess(booking__form__phone);
        valid = true;
    }
    return valid;
}

booking__form__name.oninput = checkUsername
booking__form__email.oninput = checkEmail
booking__form__phone.oninput = checkPhone