const Sequelize = require('sequelize');
const { User, Level } = require('../models');

const adminController = {
    viewAdminHome(req, res) {
        res.render('admin');
    },
    async viewAdminUserPage(req, res) {  
        // pour la page d'administration, je voudrais afficher tous les User
        // donc... je dois les récuperer grace a Sequelize :)

        const allUser = await User.findAll({
            order: ['role']
        });

        res.render('admin_user', { allUser });
    },

    async deleteUserById(req, res) {
        const userToDelete = await User.findByPk(req.params.id);

        // si user non trouvé, je leve une erreur
        if (!userToDelete) {
            return res.status(404).send('No such user.');
        }

        if (userToDelete.email === req.session.user.email) {
            return res.status(409).send('You cannot delete yourself...');
        }

        // je supprime l'utilisateur
        await userToDelete.destroy();

        // et enfin, je repars sur la page d'admin
        return res.redirect('/admin/user');
    },

    async makeUserAdmin(req, res) {
        const userToPromote = await User.findByPk(req.params.id);

        // si user non trouvé, je leve une erreur
        if (!userToPromote) {
            return res.status(404).send('No such user.');
        }

        // je rend l'utilisateur admin
        userToPromote.role = 'admin';

        // je sauvegarde en débé
        await userToPromote.save();

        // et enfin, je repars sur la page d'admin
        return res.redirect('/admin/user');
    },

    viewCreateLevel(req, res) {
        res.render('create_level');
    },

    async createLevelAction(req, res) {
        // je veux faire quoi ?

        // je commence par vérifier qu'un niveau n'existe pas avec le meme nom
        const existingLevel = await Level.findOne({
            where: {
                name: {
                    [Sequelize.Op.iLike]: `${req.body.level}`
                }
            }
        });

        if (existingLevel) {
            return res.status(409).render('create_level', { error: 'Ce nom est déja pris par un autre niveau'});
        }

        // Je veux créer une instance de level, a partir de req.body.level
        const newLevel = new Level({ name: req.body.level });

        // je veux ensuite sauvegarder cette instance
        await newLevel.save();

        // et enfin, je veux rediriger vers la page de listing des niveaux/admin/level
        res.redirect(303, '/admin/level');
    },

    async viewAdminLevelPage(req, res) {
        // récupérer tous mes niveaux...
        const allLevels = await Level.findAll();

        res.render('admin_level', { allLevels });
    },

    async deleteLevelById(req, res) {
        const levelToDelete = await Level.findByPk(req.params.id);

        // si level non trouvé, je leve une erreur
        if (!levelToDelete) {
            return res.status(404).send('No such level.');
        }

        // je supprime le level
        await levelToDelete.destroy();

        // et enfin, je repars sur la page d'admin
        return res.redirect('/admin/level');
    }
}

module.exports = adminController;
