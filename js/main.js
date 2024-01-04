var userNameInput = document.getElementById("userNameInput");
var emailInput = document.getElementById("emailInput");
var passwordInput = document.getElementById("passwordInput");

var emailInputLogin = document.getElementById("emailInputLogin");
var passwordInputLogin = document.getElementById("passwordInputLogin");

var sessionUserName = "";
usersList = [];
if (localStorage.getItem("users") != null) {
    usersList = JSON.parse(localStorage.getItem("users"));
}

function addData () {
    var userN = userNameInput.value;
    var userE = emailInput.value;
    var userPass = passwordInput.value;

    var user = {
        userName: userN,
        email: userE,
        password: userPass
    };


    var usernamePattern = /^[a-zA-Z0-9]{3,16}$/
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
    var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (usersList.map(x => x.email).includes(userE)) {
        document.getElementById("alertEmail").innerHTML="thie Email is Already Token"; // to Check if Email dosent used
    } else {
        document.getElementById("alertEmail").innerHTML="";
        if ((userN.length && userE.length && userPass.length )== 0 ) {
            document.getElementById("alertAll").innerHTML="All Inputs Required"; // to Check if inputs is filled
        } else {
            document.getElementById("alertAll").innerHTML="";
            if (usernamePattern.test(userN)) {
                document.getElementById("alertUserName").innerHTML="";
                if (emailPattern.test(userE)) {
                    document.getElementById("alertEmail").innerHTML="";
                    if (passwordPattern.test(userPass)) {
                        document.getElementById("alertPassword").innerHTML="";
                        usersList.push(user);
                        localStorage.setItem("users", JSON.stringify(usersList));
                        clearForm()
                        replaceDisplay()
                    } else {
                        document.getElementById("alertPassword").innerHTML="Please enter a password that is at least 8 characters long and includes at least one uppercase letter, one lowercase letter, and one digit.";
                    }
                } else {
                    document.getElementById("alertEmail").innerHTML="* Please enter a valid email address in the format example@example.com."; // to Check if Email input is Valid
                }
            } else {
                document.getElementById("alertUserName").innerHTML="* Please enter a username that consists of 3 to 16 characters, using only letters, numbers, hyphens, and underscores."; // to Check if UserName input is Valid
            }

        }
    }

}

    document.getElementById("signInButton").addEventListener("click", function () {
        addData();
    })
    document.getElementById("to_signin" ).addEventListener("click", function () {
        replaceDisplay()
    })


// console.log(emailPattern.test("example@example.com") )


    function clearForm () {
        userNameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";
};


function replaceDisplay () {
    document.querySelector(".login").classList.remove("d-none")
    document.querySelector(".signup").classList.add("d-none")
}

function checkData () {
    var emailLogin = emailInputLogin.value;
    var passLogin = passwordInputLogin.value;
    if ((emailLogin.length && passLogin.length) == 0) {
        document.getElementById("alertAllLogin").innerHTML = "All Inputs Required"
    } else {
        document.getElementById("alertAllLogin").innerHTML = ""
        for (i = 0; i < usersList.length; i++){
            console.log(emailLogin , passLogin)
            if (usersList[i].email == emailLogin && usersList[i].password == passLogin ) {
                sessionUserName = usersList[i].userName;
                localStorage.setItem("sessionUserName", sessionUserName)
                document.getElementById("alertAllLogin").innerHTML = ""
                window.location.href = "home.html";
            } else {
                document.getElementById("alertAllLogin").innerHTML = "Incorrect Email or password"
            }
        }
    }
}

document.getElementById("logInButtonLogin").addEventListener("click", function () {
    checkData()
})