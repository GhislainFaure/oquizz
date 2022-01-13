const Sequelize = require("sequelize");
const sequelizeConnection = require("../sequelize");

class Quiz extends Sequelize.Model {}

Quiz.init(
    {
        description: Sequelize.STRING,
        anecdote: Sequelize.STRING,
        wiki: Sequelize.STRING,
    },
    {
        sequelize: sequelizeConnection,
        tableName: 'quiz',
    }
);

module.exports = Quiz;
