const e = require("express");

class CoreModel {
    // id est une propriété privée
    // on ne veut pas que les enfants
    // puissent le modifier
    #id;

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
}

module.exports = CoreModel;