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