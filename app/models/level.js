const client = require('../client');
const CoreModel = require("./coreModel");

class Level extends CoreModel {
    name;

    static tableName = "level";

    constructor(obj) {
        // on appelle le constructeur parent
        super(obj);

        if (typeof obj.name !== 'string') {
            throw new Error('Level.name must be a string !');
        }
        this.name = obj.name;
    }

    static async findAll() {
        const result = await client.query('SELECT * from level');

        // sinon, on va fabriquer un tableau de class Level
        let levels = [];

        for (const obj of result.rows) {
            // j'apelle mon constructeur, et je stocke l'instance de level fabriquée
            // dans un tableau
            levels.push(new Level(obj));
        }

        return levels;
    }

    static async findById(id) {
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

    async update() {
        const query = {
            text: `
                UPDATE "level"
                SET "name" = $1
                WHERE "id" = $2;
            `,
            values: [this.name, this.id]
        };

        await client.query(query);
    }

    // insertion, méthode d'instance : sauvegarde l'instance en cours, en db
    async insert() {
        const query = {
            // returning id nous permet de récupérer l'id inséré
            text: `
                INSERT INTO "level"
                ("name")
                VALUES($1)
                RETURNING "id"
            `,
            values: [this.name]
        };

        const result = await client.query(query);

        // après avoir inséré, je récupère l'id
        const newId = result.rows[0].id;

        // je stocke l'id dans mon instance qui n'en avait pas encore
        this.id = newId;
    }
}

module.exports = Level;
