const CoreModel = require("./coreModel");

class Level extends CoreModel {
    name;

    constructor(obj) {
        // on appelle le constructeur parent
        super(obj);

        if (typeof obj.name !== 'string') {
            throw new Error('Level.name must be a string !');
        }
        this.name = obj.name;

    }
}

module.exports = Level;
