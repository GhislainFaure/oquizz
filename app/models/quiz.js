const Sequelize = require("sequelize");
const sequelizeConnection = require("../sequelize");

class Quiz extends Sequelize.Model {}

Quiz.init(
    {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
    },
    {
        sequelize: sequelizeConnection,
        tableName: 'quiz',
    }
);

module.exports = Quiz;
 