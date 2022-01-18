const { User } = require('../models');

const adminController = {
    async viewAdminPage(req, res) {  
        // pour la page d'administration, je voudrais afficher tous les User
        // donc... je dois les récuperer grace a Sequelize :)

        const allUser = await User.findAll({
            order: ['role']
        });

        res.render('admin', { allUser });
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
        return res.redirect('/admin');
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
        return res.redirect('/admin');
    }
}

module.exports = adminController;
