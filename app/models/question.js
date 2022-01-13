const Sequelize = require("sequelize");
const sequelizeConnection = require("../sequelize");

class Question extends Sequelize.Model {}

Question.init(
    {
        question: Sequelize.STRING,
        anecdote: Sequelize.STRING,
        wiki: Sequelize.STRING,
    },
    {
        sequelize: sequelizeConnection,
        tableName: 'question',
    }
);


module.exports = Question;
