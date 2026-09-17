const CustBtn = document.getElementById("CustBtn");
const maincontainer = document.getElementById("maincontainer");
const close = document.getElementById("close");
const card = document.getElementById("card");
const back_close = document.getElementById("back_close");
const bg_image = document.getElementById("bg_image");
const signupbtn = document.getElementById("signupbtn");
const Signinbtn = document.getElementById("Signinbtn");
const ClntBtn = document.getElementById("ClntBtn");
const maincontainer1 = document.getElementById("maincontainer1");
const close1 = document.getElementById("close1");
const card1 = document.getElementById("card1");
const back_close1 = document.getElementById("back_close1");
const signupbtn1 = document.getElementById("signupbtn1");
const Signinbtn1 = document.getElementById("Signinbtn1");

ClntBtn.addEventListener("click",popupbox1);
close1.addEventListener("click",closebox1);
back_close1.addEventListener("click",closebox1);
signupbtn1.addEventListener("click",flipcard1);
Signinbtn1.addEventListener("click",flipcard1);
CustBtn.addEventListener("click",popupbox);
close.addEventListener("click",closebox);
back_close.addEventListener("click",closebox);
signupbtn.addEventListener("click",flipcard);
Signinbtn.addEventListener("click",flipcard);

function popupbox(){
    maincontainer1.style.display = "none";
    bg_image.style.filter = "none";
    maincontainer.style.display = "block";
    /* Add the blur effect */
    bg_image.style.filter = "blur(5px)";
    
}
function closebox(){
    maincontainer.style.display = "none";
    bg_image.style.filter = "none";
}
function flipcard(){
    card.classList.toggle("flipcard");
}

function popupbox1(){
    maincontainer.style.display = "none";
    bg_image.style.filter = "none";
    maincontainer1.style.display = "block";
    /* Add the blur effect */
    bg_image.style.filter = "blur(5px)";

}
function closebox1(){
    maincontainer1.style.display = "none";
    bg_image.style.filter = "none";
}
function flipcard1(){
    card1.classList.toggle("flipcard1");
}
<<<<<<< Updated upstream
/*function validateform()
{
    var password=document.CustLogin.password.value;
    var regularExpression  = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/; 
    if(password.length < 8 || password.length > 15){
        alert("Password length should be between 8 and 15 characters");
        return false;
    }
    if(!regularExpression.test(password)){ 
        alert("Password should contain at least one number, one character, and one special character");
        return false;
    }
}*/

function validateMyForm(formElement) {
  // Query fields within the passed form pointer
  const Email = formElement.querySelector('input[name="Email"]').value;
  const password = formElement.querySelector('input[name="password"]').value;
  const regularExpression  = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/; 
=======
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,15}$/;
>>>>>>> Stashed changes

function validateAuthForm(email, password, mode, confirmPassword) {
    if (!email || !emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (!password) {
        alert("Password is required.");
        return false;
    }

    if (!passwordPattern.test(password)) {
        alert("Password must be 8-15 chars and include letter, number, and special character.");
        return false;
    }

    if (mode === "register") {
        if (!confirmPassword) {
            alert("Confirm password is required.");
            return false;
        }
        if (password !== confirmPassword) {
            alert("Password and confirm password do not match.");
            return false;
        }
    }

    return true;
}

async function handleAuthSubmit(formElement, event, role, mode) {
    event.preventDefault();

    const email = String(formElement.querySelector('input[name="email"]').value || "").trim().toLowerCase();
    const password = String(formElement.querySelector('input[name="password"]').value || "");
    const confirmInput = formElement.querySelector('input[name="confirmPassword"]');
    const confirmPassword = confirmInput ? String(confirmInput.value || "") : "";

    if (!validateAuthForm(email, password, mode, confirmPassword)) {
        return false;
    }

    const endpoint = mode === "register" ? "/api/auth/register" : "/api/auth/login";

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ role, email, password })
        });

        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
            alert(payload.message || "Authentication failed. Please try again.");
            return false;
        }

        alert(payload.message || (mode === "register" ? "Registered successfully" : "Login successful"));

        if (role === "customer") {
            window.location.href = "../Customer/Customer.html";
        } else {
            window.location.href = "../Category/Category.html";
        }

        return false;
    } catch (error) {
        console.error("Auth request failed:", error);
        alert("Could not reach auth server. Make sure backend is running on port 4000.");
        return false;
    }
}

