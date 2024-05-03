const form = document.querySelector('#form');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const passwordConfirm = document.querySelector('#passwordConfirm');
const success = document.querySelector('#success');
const error = document.querySelector('#error');

form.addEventListener("submit", () => {
    const register = {
        name : name.value,
        email : email.value,
        password : password.value,
        passwordConfirm : passwordConfirm.value
    }
    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(register)
    }).then(res => res.json())
        .then(data => {
            if(data.status == "error"){
                success.style.display = "none";
                error.style.display = "block";
                error.innerText = data.error;
            }
            else{
                error.style.display = "none";
                success.style.display = "block";
                success.innerText = data.success;
            }
        })
        
});

