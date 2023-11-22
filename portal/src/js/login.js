document.addEventListener("DOMContentLoaded", function () {
    /** "popup" */
    const registrationPopup = document.getElementById("registration-popup");
    const loginPopup = document.getElementById("login-popup");
    const restorePopup = document.getElementById("restore-popup");
    
    /** botones */
    const loginButton = document.getElementById("login-button");
    const recoverButton = document.getElementById("restore-button");
    const registerButton = document.getElementById("register-button");
    const backToLoginButton = document.getElementById("backToLogin-button");
    const closePopupButton = document.getElementById("close-login-popup");

    loginButton.addEventListener("click", function () {
        loginPopup.style.display = "block";
        registrationPopup.style.display = "none";
        restorePopup.style.display = "none"; 
    });

    registerButton.addEventListener("click", function () {
        registrationPopup.style.display = "block";
        loginPopup.style.display = "none";
        restorePopup.style.display = "none";
    });

    recoverButton.addEventListener("click", function () {
        loginPopup.style.display = "none";
        registrationPopup.style.display = "none";
        restorePopup.style.display = "block";
        
    })

    backToLoginButton.addEventListener("click", function () {
        loginPopup.style.display = "block";
        registrationPopup.style.display = "none";
        restorePopup.style.display = "none";
    });

    function closePopup() {
        loginPopup.style.display = "none";
    }

    closePopupButton.addEventListener("click", closePopup);
});