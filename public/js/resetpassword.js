const form = document.querySelector('#form');
const password = document.querySelector('#password');
const passwordConfirm = document.querySelector('#passwordConfirm');
const success = document.querySelector('#success');
const error = document.querySelector('#error');



form.addEventListener("submit", () => {
    const resetpwd = {
        password : password.value,
        passwordConfirm : passwordConfirm.value
    }
    fetch("/resetpwd", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(resetpwd)
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
            if (data.redirect) {
                setTimeout(() => {
                    window.location.href = data.redirect;
                }, 1500);
            }
        })
        
});

