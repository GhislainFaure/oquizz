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

    // On ne met pas de mutateur ici car c'est l'insertion en BDD qui le génère,
    // et on ne veut pas permettre la modification manuelle
}

module.exports = CoreModel;