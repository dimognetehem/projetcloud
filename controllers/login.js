const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../routes/db-config');




const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({status: "error", error: "Tous les champs doivent être renseignés"});

        }
        else{
            db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
                console.log(results);
                if (!results[0] || !await bcrypt.compare(password, results[0].password)) {
                    return res.json({status: "error", error: "Email ou Mot de passe incorrect"});

                } 
                else {
                    const id = results[0].id;
    
                    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRES_IN
                    });
    
                    console.log("the token is " + token);
    
                    const cookieOptions = {
                        expires: new Date(
                            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                        ),
                        httpOnly: true
                    }
                    res.cookie('userSave', token, cookieOptions);
                    /* res.redirect("/"); */
                    return res.json({status: "success", success: "Login successfull", redirect: "/"});
                    
                }
            })
        }
        
    } catch (err) {
        console.log(err);
    }
}
module.exports = login;