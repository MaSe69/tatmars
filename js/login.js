function login() {
    var form = document.getElementById('login_form');
    form.onsubmit = function (e) {
        e.preventDefault();
        var password = form.password.value;

        // Get the password of the application
        apppassword = getAppPassword();

        if (password == apppassword) {
            console.log('Thanks for loging in!');
            document.getElementById("passwordnotok").innerHTML = "";
            document.getElementById("passwordok").innerHTML = "Welcome! One moment, we let you in.";
            toPrivateArea();
        } else {
            document.getElementById("passwordnotok").innerHTML = "Sorry, that does not work. Please try again!";
        }
    }
}

function toPrivateArea() {
    window.location.replace("9a0764b2ecd7c88d4e59fdad3580dcfd96914b29/private");
}

