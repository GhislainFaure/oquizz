const { STRING, Model } = require('sequelize');
const sequelizeConnection = require('../sequelize');

class User extends Model {}

User.init(
    {
        email: STRING,
        password: STRING,
        firstname: STRING,
        lastname: STRING
    },
    {
        // l'instance sequelize, pour savoir a quelle base de donnée parler
        sequelize: sequelizeConnection,
        // le nom de la table
        tableName: "user"
    }
);

module.exports = User;
