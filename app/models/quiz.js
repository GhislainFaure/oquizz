const CoreModel = require("./coreModel");

class Quiz extends CoreModel {
    title;
    description;
    user_id;

    constructor(obj) {
        // on appelle le constructeur parent
        super(obj);

        if (typeof obj.title !== 'string') {
            throw Error("Quiz.title must be a string!");
        }
        this.title = obj.title;

        if (typeof obj.description !== 'string') {
            throw Error("Quiz.description must be a string!");
        }
        this.description = obj.description;

        console.log(obj.user_id);
        // est-ce que obj.user_id est un nombre
        // je vérifie que user_id est bien un nombre
        if(typeof obj.user_id !== 'number') {
            throw Error("Quiz.user_id must be an integer!");
        }
        this.user_id = obj.user_id;
    }
}

module.exports = Quiz;
