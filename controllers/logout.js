


const logout = (req, res) => {
    res.cookie('userSave', 'logout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    });
    res.clearCookie('userSave');
    res.clearCookie('email');
    res.status(200).redirect("/");
}
module.exports = logout;