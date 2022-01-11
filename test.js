// on va charger nos variables d'environnement
require('dotenv').config();

const Level = require('./app/models/level');

 async function test() {
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

test();
