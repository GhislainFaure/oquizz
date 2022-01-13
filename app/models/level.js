const Sequelize = require('sequelize');
const sequelizeConnection = require('../sequelize');

// comme avant, sauf que je n 'étends plus CoreModel mais Sequelize.Model
class Level extends Sequelize.Model {}

// un tableau d'attributs, avec leurs types
const attributes = {
    name: Sequelize.STRING,
};

// des options. Deux sont obligatoires :
const options = {
    // l'instance sequelize, pour savoir a quelle base de donnée parler
    sequelize: sequelizeConnection,
    // le nom de la table
    tableName: "level"
};

Level.init(attributes, options);

module.exports = Level;
