const { Quiz } = require('../models');

const mainController = {
    async homePage(req, res) {
        const quizList = await Quiz.findAll({
            include: ['author']
        });

        res.render('home', { quizList });
    }
}

module.exports = mainController;
