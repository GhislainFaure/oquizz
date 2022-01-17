const { Quiz } = require('../models');

const quizController = {
    async viewOneQuiz(req, res) {
        // je veux afficher UN quiz
        // je voudrais récupérer le quiz avec :
        // son auteur, ses catégories (tags), ses questions, et les réponses des questions
        const foundQuiz = await Quiz.findByPk(req.params.id, {
            include: [
                'author',
                'tags',
                { association: 'questions', include: ['level', 'answers'] }
            ]
        });

        res.render('quiz', { quiz: foundQuiz });
    }
}

module.exports = quizController;
