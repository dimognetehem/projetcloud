const db = require('../routes/db-config');
const cookieParser = require('cookie-parser');

const resetemail = (req, res) => {
    console.log(req.body);
    const test = req.body.email;
    const {email} = req.body;
    if(!email){
        return res.json({status: "error", error: "Tous les champs doivent être renseignés"});
    }
    else{
        db.query('SELECT email from users WHERE email = ?', [email], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                if (results.length == 0) {
                    return res.json({status: "error", error: "Cet email n'existe pas"});
                } 
                else{
                    res.cookie('email', email);
                    return res.json({status: "success", success: "Cet email existe", mail: email, redirect: "/pwdreset"});
                }
            }
        })
    }
}
module.exports = resetemail;