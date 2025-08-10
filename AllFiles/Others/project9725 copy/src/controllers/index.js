class IndexController {
    home(req, res) {
        console.log('Home controller called');
        res.render('index');
    }
}

module.exports = IndexController;