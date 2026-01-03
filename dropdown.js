
const reportDropdown = document.querySelectorAll(".reportDropdown");

  reportDropdown.forEach(dropdown => {
dropdown.addEventListener("change", function() {
  const selectedPage = this.value;
  if(selectedPage) {
    window.location.href = selectedPage;
  }
});
});
  
function showLoginForm() {
            document.getElementById('loginForm').classList.remove('hidden');
            document.getElementById('signupForm').classList.add('hidden');
            document.getElementById('loginTab').classList.add('border-b-2', 'border-gray-700', 'text-gray-700');
            document.getElementById('loginTab').classList.remove('text-gray-500');
            document.getElementById('signupTab').classList.remove('border-b-2', 'border-gray-700', 'text-gray-700');
            document.getElementById('signupTab').classList.add('text-gray-500');
            return false;
        }
        
        function showSignupForm() {
            document.getElementById('loginForm').classList.add('hidden');
            document.getElementById('signupForm').classList.remove('hidden');
            document.getElementById('signupTab').classList.add('border-b-2', 'border-gray-700', 'text-gray-700');
            document.getElementById('signupTab').classList.remove('text-gray-500');
            document.getElementById('loginTab').classList.remove('border-b-2', 'border-gray-700', 'text-gray-700');
            document.getElementById('loginTab').classList.add('text-gray-500');
            return false;
        }
        
        // Add click handlers to tabs
        document.getElementById('loginTab').addEventListener('click', showLoginForm);
        document.getElementById('signupTab').addEventListener('click', showSignupForm);


// check for admin


function admin(event){
  event.preventDefault();
const userName = document.getElementById("username").value;
const password = document.getElementById("password").value;

if (userName === "admin" && password === "1234"){
  localStorage.setItem("isAdmin" , "true")
  alert("Admin logged in!!")
  window.location.href = "lostitems.html"
}
else {
  localStorage.setItem("isAdmin", "false")
  alert("username or password is incorrect!")
};
};
const button = document.getElementById("login_button");
button.addEventListener("click", admin)





 







 