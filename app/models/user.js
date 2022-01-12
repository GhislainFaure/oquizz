const client = require('../client');
const CoreModel = require("./coreModel");

class User extends CoreModel {
    email;
    password;
    firstname;
    lastname;

    constructor(obj) {
        // on appelle le constructeur parent
        super(obj);

        if (typeof obj.email !== 'string') {
            throw new Error('User.email must be a string !');
        }
        this.email = obj.email;

        if (typeof obj.password !== 'string') {
            throw new Error('User.password must be a string !');
        }
        this.password = obj.password;

        if (typeof obj.firstname !== 'string') {
            throw new Error('User.firstname must be a string !');
        }
        this.firstname = obj.firstname;

        if (typeof obj.lastname !== 'string') {
            throw new Error('User.lastname must be a string !');
        }
        this.lastname = obj.lastname;
    }

    static async findAll() {
        const result = await client.query('SELECT * from "user"');

        // sinon, on va fabriquer un tableau de class users
        let users = [];

        for (const obj of result.rows) {
            // j'apelle mon constructeur, et je stocke l'instance de level fabriquée
            // dans un tableau
            users.push(new User(obj));
        }

        return users;
    }

    static async findById(id) {
        const query = {
            text: 'SELECT * from "user" where id=$1',
            values: [id]
        }

        const result = await client.query(query);

        if (result.rows.length === 0) {
            throw Error('No such id ' + id);
        }
        
        return new User(result.rows[0]);
    }

    // je veux supprimer en base de données...
    // l'instance courante.
    async delete() {
        const query = {
            text: 'DELETE FROM "user" where id=$1',
            values: [this.id]
        }

        const result = await client.query(query);

        if (result.rowCount === 0) {
            throw Error('Did not delete any rows');
        }
        // pas d'erreur ? ok on a supprimé qqch, ok on renvoie true.
        return true;
    }

    async update() {
        const query = {
            text: `
                UPDATE "user"
                SET "email" = $1,
                "password" = $2,
                "firstname" = $3,
                "lastname" = $4
                WHERE "id" = $5;
            `,
            values: [this.email, this.password, this.firstname, this.lastname, this.id]
        };

        await client.query(query);
    }

    // insertion, méthode d'instance : sauvegarde l'instance en cours, en db
    async insert() {
        const query = {
            // returning id nous permet de récupérer l'id inséré
            text: `
                INSERT INTO "user"
                ("email", "password", "firstname", "lastname")
                VALUES ($1, $2, $3, $4)
                RETURNING "id"
            `,
            values: [this.email, this.password, this.firstname, this.lastname]
        };

        const result = await client.query(query);

        // après avoir inséré, je récupère l'id
        const newId = result.rows[0].id;

        // je stocke l'id dans mon instance qui n'en avait pas encore
        this.id = newId;
    }
}

module.exports = User;
