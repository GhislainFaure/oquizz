# Recap mise en place Sequelize

## C'est quoi ?

Un outil qui va gérer la base de donnée pour nous : un ORM.

## Déclarer un client Sequelize

On doit créer une instance pour notre base de donnée. Comme ceci : 

```javascript
// un peu comme on faisait avec le client pg
// on va récupérer la classe Sequelize
const { Sequelize } = require('sequelize');

// dont nous allons faire une instance
// on parlera de notre CLIENT SEQUELIZE
// on lui donne l'url de la base de donnée
const sequelize = new Sequelize(process.env.PG_URL, {
    define: {
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    }
});

// que l'on exporte
module.exports = sequelize;
```

## Déclarer un modèle

On va extend Sequelize.Model, puis appeler la méthode init pour paramétrer notre modele.

```javascript
const Sequelize = require('sequelize');
const sequelizeConnection = require('../sequelize');

// comme avant, sauf que je n 'étends plus CoreModel mais Sequelize.Model
class Level extends Sequelize.Model {
}

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
```

Ici on donne a init 2 objets. Dans le premier on a les attributs de notre modele (= les colonnes de notre table) ainsi que leur type. Dans le second, on a 2 options obligatoires :

- le nom de la table
- l'instance de sequelize crée précédemment.