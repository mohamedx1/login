var welcomeUser = localStorage.getItem("sessionUserName");

document.getElementById("welcomeMessage").innerHTML = ` welcome ${ welcomeUser }`;

function logout () {
    window.location = "/index.html";
    localStorage.removeItem("sessionUserName");
}

document.getElementById("logoutBtn").addEventListener("click", function () {
    logout();
})