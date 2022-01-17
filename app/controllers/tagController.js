const { Tag } = require('../models');

const tagController = {
    async viewTags(req, res) {
        const tagList = await Tag.findAll();

        res.render('tags', { tagList });
    },

    async viewAllQuizOfTag(req, res) {
        // objectif : récupérer tous les quiz d'un tag donné

        const tagWithQuizList = await Tag.findByPk(req.params.id, {
            include: [{
                association: 'quizList',
                include: ['author']
            }]
        });



        res.render('tag', { tag: tagWithQuizList });
    }
}

module.exports = tagController;
