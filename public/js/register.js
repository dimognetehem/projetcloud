const form = document.querySelector('#form');
const name = document.querySelector('#name');
const prenom = document.querySelector('#prenom');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const passwordConfirm = document.querySelector('#passwordConfirm');
const profile_pic = document.querySelector('#profile_pic');
const cv = document.querySelector('#cv');
const gender = document.querySelector('#gender');
const success = document.querySelector('#success');
const error = document.querySelector('#error');

form.addEventListener("submit", () => {
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('prenom', prenom.value);
    formData.append('email', email.value);
    formData.append('password', password.value);
    formData.append('passwordConfirm', passwordConfirm.value);
    formData.append('profile_pic', profile_pic.files[0]);
    formData.append('cv', cv.files[0]);
    formData.append('gender', gender.value);

    console.log(formData);
    
    /* const register = {
        name : name.value,
        prenom : prenom.value,
        email : email.value,
        password : password.value,
        passwordConfirm : passwordConfirm.value,
        profile_pic : profile_pic.value,
        cv : cv.value
        
    } */
    // console.log('Ce que je veux'+register);
    fetch("/register", {
        method: "POST",
        body: formData,
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
                }, 1000);
            }
        })
        
});

