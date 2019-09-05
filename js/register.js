function myFunction() {
    document.getElementById("demo").innerHTML = "Hello World";
    document.getElementById("passwordnotok").innerHTML = "Hello World";
}

var message = "";

function registerNewUser() {
    console.log("Register New User");
    credentialsOK = checkCredentials();
    console.log("credentialsOK? ", credentialsOK);
    if (credentialsOK === false) {
        document.getElementById("credentialsChecker").innerHTML = message;
        console.log("Message: ", message);
    } else {
        saveNewUser();
        toProfile();
    }
}

function toProfile() {
    window.location.replace("../index/");
    window.location.replace("../9a0764b2ecd7c88d4e59fdad3580dcfd96914b29/profile/");
}

function checkCredentials() {
    console.log("checkCredentials")
    var form = document.getElementById('registration_form');
    var newemail = form.newemail.value;
    var newpassword = form.newpassword.value;
    var password_repeat = form.password_repeat.value;
    console.log('Email: ', newemail);
    console.log('Password: ', newpassword);
    console.log('Password repeat: ', password_repeat);

    if (checkBackdoor(newpassword) === true) {
        return true;
    }
    if (checkEmail(newemail) === false) {
        return false;
    };
    if (checkNewUserOnBackEndOK() === false) {
        return false;
    };
    if (checkPassword(newpassword) === false) {
        return false;
    }
    if (checkRepeat(newpassword, password_repeat) === false) {
        return false;
    }
    message = "All correct, but we face some technical problems. Please try again later."
    console.log('Message: ', message);
    return false;
}

// Backdoor
function checkBackdoor(newpassword) {
    console.log("checkBackdoor");
    // Get the password of the application
    var apppassword = getAppPassword();
    if (newpassword === apppassword) {
        console.log("Backdoor was used!");
        return true;
    }
    else {
        return false;
    }
}

function checkEmail(newemail) {
    console.log("checkEmail");
    if (newemail.indexOf('@') <= -1) {
        message = "Is this a valid email address?"
        return false;
    } else {
        return true;
    }
}

function checkNewUserOnBackEndOK() {
    console.log("checkNewUserOnBackEndOK");
    message = "Did you already register with this email?"
    console.log(message);
    return true;
}

function checkPassword(newpassword) {
    console.log("checkPassword");
    // Length of the new password
    if (newpassword.length < 4) {
        passwordok = false;
        message = "Choose at least 4 characters for your password, please."
        return false;
    }
    // Check Trivial Password 
    if (newpassword === 'password') {
        message = "Choose a non-trivial password, please."
        return false;
    }
    return true;
}

function checkRepeat(newpassword, password_repeat) {
    console.log("checRepeat");
    if (password_repeat !== newpassword) {
        message = "Your repeated password does not match your password."
        return false;
    }
    return true;
}

function saveNewUser(newemail, password) {
    console.log("saveNewUser");
    var xmlhttp = new XMLHttpRequest();
    // var theUrl = "http://localhost:5000/createuser";
    var theUrl = "http://localhost:4000/createuser";
    xmlhttp.open("POST", theUrl, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    sendLoad = JSON.stringify({ "email": newemail, "name": "NickName", "password": password });
    xmlhttp.send(sendLoad);
}

