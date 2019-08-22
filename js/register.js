function registerNewUser() {

    if (checkCredentials() === false) {
        document.getElementById("passwordnotok").innerHTML = message;
        exit();
    }

    // saveNewUser();
    // checkNewUserExists();
    toProfile();

}

function checkCredentials() {

    var form = document.getElementById('registration_form');
    var newemail = form.newemail.value;
    var newpassword = form.newpassword.value;
    var password_repeat = form.password_repeat.value;
    console.log('Email: ', newemail);
    console.log('Password: ', newpassword);
    console.log('Password repeat: ', password_repeat);
    if (checkBackdoor(newpassword) === true) {
        return true
    } else {
        if (checkEmail(newemail) === false) {
            return false;
        };
        if (checkPassword(newpassword, password_repeat) === false) {
            return false;
        }
        message = "All correct, but I cannot let you in right now. Please try again later."
        return false;
    }
}

// Backdoor and Savety Valve
function checkBackdoor(newpassword) {
    // Get the password of the application
    var apppassword = getAppPassword();
    if (newpassword === apppassword) {
        return true;
    }
    else {
        return false;
    }
}

function checkEmail(newemail) {
    // checkEmailAlreadyExists() - Todo: Check, if email already exists
    console.log('newemail for check', newemail);
    if (newemail.indexOf('@') <= -1) {
        message = "Is this a valid email address?"
        return false;
    } else {
        message = "";
        return true;
    }
}

function checkPassword(newpassword, password_repeat) {
    // checkEmailAlreadyExists() - Todo: Check, if email already exists
    console.log('newemail for check', newemail);

    // Length of the new password
    if (newpassword.length < 4) {
        passwordok = false;
        message = "Choose at least 4 characters for your password, please."
        return false;
    }
    // Check Password Repeat
    if (password_repeat !== newpassword) {
        message = "Your repeated password does not match your password."
        return false;
    }
    // Check Trivail Password 
    if (newpassword === 'password') {
        message = "Choose a non-trivial password, please."
        return false;
    }
    return true;
}

function saveNewUser(newemail, password) {
    var xmlhttp = new XMLHttpRequest();
    // var theUrl = "http://localhost:5000/createuser";
    var theUrl = "http://localhost:4000/createuser";
    xmlhttp.open("POST", theUrl, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    sendLoad = JSON.stringify({ "email": newemail, "name": "NickName", "password": password });
    xmlhttp.send(sendLoad);
}

function toProfile() {
    window.location.replace("../9a0764b2ecd7c88d4e59fdad3580dcfd96914b29/profile");
}