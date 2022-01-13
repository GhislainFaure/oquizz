const Sequelize = require("sequelize");
const sequelizeConnection = require("../sequelize");

class Answer extends Sequelize.Model {}

Answer.init(
    {
        description: Sequelize.STRING
    },
    {
        sequelize: sequelizeConnection,
        tableName: 'answer',
    }
);


module.exports = Answer;
