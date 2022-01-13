const Sequelize = require('sequelize');
const sequelizeConnection = require('../sequelize');

class User extends Sequelize.Model {}

User.init(
    {
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        firstname: Sequelize.STRING,
        lastname: Sequelize.STRING
    },
    {
        // l'instance sequelize, pour savoir a quelle base de donnée parler
        sequelize: sequelizeConnection,
        // le nom de la table
        tableName: "user"
    }
);

module.exports = User;
