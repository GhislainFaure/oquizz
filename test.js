// on va charger nos variables d'environnement
require('dotenv').config();

const Level = require('./app/models/level');
const User = require('./app/models/user');

async function testUser() {
    const users = await User.findAll();

    console.log('users : ', users);

    // const chalamet = await User.findById(4);

    // console.log('chalamet : ', chalamet);

    // await chalamet.delete();

    const dicaprio = await User.findById(6);


    await dicaprio.delete();

    // const newUser = new User({
    //     email: 'bggsurleretour@wanadoo.fr',
    //     password: 'titanic',
    //     firstname: 'Leonardo',
    //     lastname: 'Di Caprio'
    // });

    // await newUser.insert();
}

async function testLevel() {
    // trouver tous les niveaux...
    const levels = await Level.findAll();

    console.log('mes levels sont : ', levels);

    // trouver par ID...
    const levelHard = await Level.findById(3);

    // on peut changer des attributs d'une instance
    levelHard.name = 'Engageant';
    // puis sauvegarder en base
    // on parlera des fois de "persister" ou "ecrire"
    levelHard.update();

    // supprimer un niveau
    // const deleteResult = await levelGigaDur.delete();

    // if (deleteResult) {
    //     console.log('la suppression a réussi');
    // }

    // créer un niveau localement (il est pas encore dans la Débé)
    const newLevel = new Level({
        name: 'Bébé'
    });

    // insérer le niveau en DB
    await newLevel.insert();

    console.log('cool jai inséré le niveau. maintenant son id est : ', newLevel.id);
}

async function test() {
    const niveauBebe = await Level.findById(17);

    console.log('niveauBebe : ', niveauBebe);
    await niveauBebe.delete();
}

test();
