// on va charger nos variables d'environnement
require('dotenv').config();

const Level = require('./app/models/level');

async function test() {
    const niveauFacile = await Level.findByPk(1);

    console.log('le niveau facile : ', niveauFacile);
}

test();


