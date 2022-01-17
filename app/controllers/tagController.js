const { Tag } = require('../models');

const tagController = {
    async viewTags(req, res) {
        const tagList = await Tag.findAll();

        res.render('tags', { tagList });
    }
}

module.exports = tagController;
