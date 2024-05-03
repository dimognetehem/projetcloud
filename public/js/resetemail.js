const form = document.querySelector('#form');
const email = document.querySelector('#email');

const success = document.querySelector('#success');
const error = document.querySelector('#error');

form.addEventListener("submit", () => {
    const resetemail = {
        email : email.value,
    }
    fetch("/resetemail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(resetemail)
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

