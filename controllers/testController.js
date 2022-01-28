const Club = require('../models/club');

const showError = require('../lib/errors').showError;

exports.test = async(req, res) => {
    try {
        const clubs = await Club.find({});
        res.render("test_page.hbs", {
            title: "Test",
            clubs: clubs
        });
    } catch (error) {
        showError(error);
        res.render("error.hbs");
    };
};