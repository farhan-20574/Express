module.exports = {
    show(req,res) {
        res.render('index', { isAuthenticated: !!req.user})
    }
}