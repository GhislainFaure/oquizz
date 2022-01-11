const CoreModel = require("./coreModel");

class Quiz extends CoreModel {
    title;
    description;

    constructor(obj) {
        // on appelle le constructeur parent
        super(obj);
        this.title = obj.title;
        this.description = obj.description;

        if (typeof obj.title !== 'string') {
            throw Error("Quiz.title must be a string!");
        }
        this.title = obj.title;

        if (typeof obj.description !== 'string') {
            throw Error("Quiz.description must be a string!");
        }
        this.description = obj.description;
    }
}

module.exports = Quiz;
