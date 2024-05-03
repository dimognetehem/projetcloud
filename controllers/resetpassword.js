const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");
const cookieParser = require('cookie-parser');


const resetpwd = async (req, res) => {
    console.log(req.body);
    const {password, passwordConfirm} = req.body;
    if(!password || !passwordConfirm){
        return res.json({status: "error", error: "Tous les champs doivent être renseignés"});
    }
    else{
        if (password != passwordConfirm) {
            return res.json({status: "error", error: "Vous avez saisi deux mots de passe différents"});
        }
        else{
            let hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword);
            console.log(req.cookies.email);
            
            db.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, req.cookies.email], (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    return res.json({status: "success", success: "Mot de passe réinitialisé avec succès", redirect: "/login"});
                    
                }
            })

        }
    }


}
module.exports = resetpwd;