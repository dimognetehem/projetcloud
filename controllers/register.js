const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");
const multer = require('multer');
const upload = multer({ storage });



const register = (req, res) => {
    upload.fields([{ name: 'urlPhoto' }, { name: 'urlCV' }]);
    console.log(req.body);

    const { name, email, password, passwordConfirm } = req.body;
    const urlPhoto = req.files['urlPhoto'][0].path;
    const urlCV = req.files['urlCV'][0].path;

    /* await uploadFichier(req.files['urlPhoto'][0]);
    await uploadFichier(req.files['urlCV'][0]); */
        
    const userDetails = { name, prenom, email, password, urlPhoto, urlCV, gender};

    userDetails.urlPhoto = `http://localhost:4566/mes-fichiers/${req.files['urlPhoto'][0].originalname}`;
    userDetails.urlCV = `http://localhost:4566/mes-fichiers/${req.files['urlCV'][0].originalname}`;

    

    if(!name || !prenom || !email || !password || !passwordConfirm || !urlPhoto || !urlCV || !gender){
        return res.json({status: "error", error: "Tous les champs doivent être renseignés"});
    } 
    else{
        db.query('SELECT email from users WHERE email = ?', [email], async (err, results) => {
            if (err) {
                console.log(err);
            } else {
                if (results.length > 0) {
                    return res.json({status: "error", error: "Cet email est déjà utilisé"});
                } 
                else if (password != passwordConfirm) {
                    return res.json({status: "error", error: "Vous avez saisi deux mots de passe différents"});
                }
                else{
                    let hashedPassword = await bcrypt.hash(password, 8);
                    console.log(hashedPassword);
                    userDetails.password = hashedPassword;
    
                    db.query('INSERT INTO users SET ?', userDetails, (err, results) => {
                        if (err) {
                            console.log(err);
                        } else {
                            return res.json({status: "success", success: "Utilisateur enregistré avec succès", body: req.body, redirect: "/login"});
                            
                        }
                    })

                }
            }
    
            
        })
        /* res.send("Form submitted"); */
    }

}   

module.exports = register;