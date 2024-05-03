const express = require("express");
const multer = require('multer');
const storage = multer.diskStorage({
    destination: './files',
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.' + file.mimetype.split('/')[1]); 
    }
  });
const upload = multer({ storage });
const register = require("../controllers/register");
const login = require("../controllers/login");
const logout = require("../controllers/logout");
const isLoggedIn = require("../controllers/loggedIn");
const resetpwd = require("../controllers/resetpassword");
const resetemail = require("../controllers/resetemail");

/* const authController = require("../controllers/auth.js"); */


const router = express.Router();

/* router.post('/register', upload.fields([{ name: 'profile_pic', maxCount: 1}, { name: 'cv', maxCount: 1}]), register);
 */


router.post('/login', login);
router.post('/resetpwd', resetpwd);
router.post('/resetemail', resetemail);

router.get('/logout', logout);


router.get('/', isLoggedIn, (req, res) => {
    if(req.user){
        res.render("index", { status: "loggedIn", user: req.user});
    }
    else{
        res.render("index", { status: "no", user: "nobody"});
    }
    
    // res.sendFile("main.html", { root: './public/' })
});
router.get('/register', (req, res) => {
    res.sendFile("register.html", { root: './public/' })
});
router.get('/login', isLoggedIn, (req, res) => {
    if(req.user){
        res.redirect("/");
    }
    else{
        res.sendFile("login.html", { root: './public/' })
    }
    
});
router.get('/emailreset', (req, res) => {
    res.sendFile("emailreset.html", { root: './public/' })
});
router.get('/pwdreset', (req, res) => {
    res.sendFile("pwdreset.html", { root: './public/' })
});
router.get('/profile', isLoggedIn, (req, res) => {
    if (req.user) {
        res.render("profile", { status: "loggedIn", user: req.user})
    } else {
        res.redirect("/login");
    }
})

module.exports = router;