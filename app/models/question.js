const Sequelize = require("sequelize");
const sequelizeConnection = require("../sequelize");

class Question extends Sequelize.Model {}

Question.init(
    {
        description: Sequelize.STRING,
        title: Sequelize.STRING,
    },
    {
        sequelize: sequelizeConnection,
        tableName: 'question',
    }
);


module.exports = Question;
