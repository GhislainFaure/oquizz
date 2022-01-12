const client = require('../client');

class CoreModel {
    // id est une propriété privée
    // on ne veut pas que les enfants
    // puissent le modifier
    #id;

    // afin de pouvoir accéder a tableName partout
    // et le redefinir dans les enfants
    // je le déclare dans le parent
    static tableName = null;

    constructor(obj) {
        // dans le constructeur, on sauvegarde
        // l'id, pas besoin de setter car on est 
        // dans la classe
        this.#id = obj.id;
    }

    // on va quand faire un getter
    // si le fils veut afficher l'id
    get id() {
        return this.#id;
    }

    set id(newValue) {
        // si on a pas encore d'id, on autorise de le changer
        // UNE FOIS
        if (this.#id === undefined) {
            // je sauvegarde mon id
            this.#id = newValue;
        } else {
            // si y'a déja un id, interdiction d'y toucher
            throw Error('Do not try to change Level id');
        }
    }

    static async findAll() {
        // alors je connais il faut faire this.constructor.tableName
        // comme dans le delete ????
        // et bien NON !
        // car ici on est dans une méthode statique, 
        // donc = this est DEJA notre classe
        // donc this.tableName suffit pour accéder a la propriété statique
        const result = await client.query(
            `SELECT * from "${this.tableName}"`
        );

        // sinon, on va fabriquer un tableau de class
        let resultAsClasses = [];

        for (const obj of result.rows) {
            // j'apelle mon constructeur, et je stocke l'instance de level fabriquée
            // dans un tableau

            // j'y suis presque, mais comment je crée une instance de ma classe ?
            // this.constructor(obj) ? avec new devant peut etre ?
            // non car on vient de dire que this est déja notre classe, car
            // on est dans une méthode statique.
            // donc on va faire new this(obj)
            // ce qui sera évalué en new Level(obj) par exemple
            resultAsClasses.push(new this(obj));
        }

        return resultAsClasses;
    }

    static async findById(id) {
        // voir les commentaires de findAll pour this.tableName
        const query = {
            text: `SELECT * from "${this.tableName}" where id=$1`,
            values: [id]
        }

        const result = await client.query(query);

        if (result.rows.length === 0) {
            throw Error('No such id ' + id);
        }

        // voir les commentaires au dessus dans findAll
        // pour ce new this
        return new this(result.rows[0]);
    }

    async update() {
        // voici ce qu'on doit fabriquer : 
        // UPDATE "user"
        //         SET "email" = $1,
        //         "password" = $2,
        //         "firstname" = $3,
        //         "lastname" = $4
        //         WHERE "id" = $5

        // un truc du genre ['"email" = $1', '"password" = $2']        
        const sets = [];
        // les valeurs des champs, genre ['toto@toto.fr', '1234]
        const values = [];

        // comme dans le insert, pour savoir a quel index je suis
        let indexPlaceholder = 1;

        for (const prop in this) {
            // je fabrique ma ligne de SET
            sets.push(`"${prop}" = $${indexPlaceholder}`)
            // je fabrique mes values
            values.push(this[prop]);

            indexPlaceholder++;
        }

        // il me manque juste a insérer l'id dans le tableau de values
        values.push(this.id);

        const query = {
            text: `
                UPDATE "${this.constructor.tableName}"
                SET ${sets}
                WHERE "id" = $${indexPlaceholder}
            `,
            values: values
        };

        await client.query(query);
    }

    // insertion, méthode d'instance : sauvegarde l'instance en cours, en db
    async insert() {
        // probleme : je veux pouvoir insérer n'importe quoi
        // et pour ca, il faut que j'accede aux propriétés de ma classe
        // level: name
        // user: firstname, lastname, email, password

        // mon but a la fin est d'écrire une requete SQL du genre :
        // INSERT INTO "chose" (truc, machin, chose) VALUES($1,$2,$3) RETURNING id;

        // les champs a placer dans notre requete SQL
        const fields = [];
        // les valeurs des champs de field, tant qu'a faire dans le meme ordre
        const values = [];
        // les fameux $1, $2, $3, $4
        const placeholders = [];

        let indexPlaceholder = 1;

        for (const prop in this) {
            // je stocke le nom de la propriete (= la colonne) dans un tableau
            fields.push(prop);
            // "je voudrais dans this, la valeur de la clé prop"
            // donc si dans prop j'ai firstname,
            // c'est comme dire this['firstname'] ou encore this.firstname
            values.push(this[prop]);
            // j'insere le $1 que je calcule a partir de indexPlaceholder
            // notons que en SQL, ces trucs commencent a 1 et pas 0
            placeholders.push(`$${indexPlaceholder}`);
            // j'augmente mon index pour le prochain tour !
            indexPlaceholder++;
        }

        const query = {
            text: `
                INSERT INTO "${this.constructor.tableName}"
                (${fields})
                VALUES
                (${placeholders})
                RETURNING id
            `,
            values: values
        }

        const insertResult = await client.query(query);

        const newId = insertResult.rows[0].id;

        this.id = newId;
    }

    async delete() {
        console.log('ca va je viens dans le delete');
        const query = {
            text: `DELETE FROM "${this.constructor.tableName}" where id=$1`,
            values: [this.id]
        }

        const result = await client.query(query);

        if (result.rowCount === 0) {
            throw Error('Did not delete any rows');
        }
    }
}

module.exports = CoreModel;