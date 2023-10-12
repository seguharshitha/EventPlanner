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
function validateform()
{
    var Email=document.CustLogin.Email.value;
    var password=document.CustLogin.password.value;
    var regularExpression  = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/; 
    if (Email==null || Email==""){  
        alert("Email can't be blank");  
        return false;  
      }else if(password.length < 6 || password.length > 15){
        return false;
    }
    else if(!regularExpression.test(password)) {
        alert("password should contain atleast one number,one character and one special character");
        return false;
    }
    
}