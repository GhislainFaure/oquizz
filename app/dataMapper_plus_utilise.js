const client = require('./client');
const Level = require('./models/level');

const dataMapper = {
    async getAllLevels() {
        const result = await client.query('SELECT * from level');

        // sinon, on va fabriquer un tableau de class Level
        let levels = [];

        for (const obj of result.rows) {
            // j'apelle mon constructeur, et je stocke l'instance de level fabriquée
            // dans un tableau
            levels.push(new Level(obj));
        }

        return levels;
    },
    async getOneLevel(id) {
        const query = {
            text: 'SELECT * from "level" where id=$1',
            values: [id]
        }

        const result = await client.query(query);

        if (result.rows.length === 0) {
            throw Error('No such id ' + id);
        }
        
        return new Level(result.rows[0]);
    }
};

module.exports = dataMapper;