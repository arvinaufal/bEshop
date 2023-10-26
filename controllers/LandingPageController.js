class LandingPageController {
    static async landingPage(req, res) {
        try {
            res.render('index');
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }
}

module.exports = LandingPageController;