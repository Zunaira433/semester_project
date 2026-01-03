function admin(event){
  event.preventDefault();
const userName = document.getElementById("username").value;
const password = document.getElementById("password").value;
const wrong_password = document.getElementById("loginMsg")

if (userName === "admin" && password === "1234"){
  localStorage.setItem("isAdmin" , "true")
  alert("Admin logged in!!")
  window.location.href = "index.html"
}
else {
  wrong_password.innerText = "Username or passwod is incorrect";
};
};

function logout(event){
     event.preventDefault();
     localStorage.setItem ("isAdmin", "false")
     alert("Admin logged out!")
     window.location.href = "index.html"
}
const button = document.getElementById("login_button");
button.addEventListener("click", admin)
const logout_button = document.getElementById("logout")
logout_button.addEventListener("click", logout)