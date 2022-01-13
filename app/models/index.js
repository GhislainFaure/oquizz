// afin d'éviter les soucis d'import circulaires,
// nous allons faire toutes nos associations ici.

// Je commence par récupérer TOUS mes models.
const Answer = require('./answer');
const Level = require('./level');
const Question = require('./question');
const Quiz = require('./quiz');
const Tag = require('./tag');
const User = require('./user');

// entre question et answer

// une question a plusieurs answers
Question.hasMany(Answer, {
    foreignKey: 'question_id',
    as: 'answers'
});

// une answer est liée a une seule question
Answer.belongsTo(Question, {
    foreignKey: 'question_id',
    as: 'question'
});

// une question est validée par une réponse...
// une question appartient a une réponse, a travers la clé étrangère answer_id
// belongsTo va chercher la clé étrangère a GAUCHE
// c'est a dire ici dans QUESTION
Question.belongsTo(Answer, {
    foreignKey: 'answer_id',
    as: 'good_answer'
});

// note : on aurait aussi pu l'écrire a l'envers a la place :
// Answer.hasOne(Question, {
//     foreignKey: "answer_id"
// });

// maintenant entre niveau et question
// un niveau a plusieurs questions
Level.hasMany(Question, {
    foreignKey: 'level_id',
    as: 'questions'
});

// une question a un seul niveau
Question.belongsTo(Level, {
    foreignKey: 'level_id',
    as: 'level'
});

// entre quizz et question...

// une question appartient a un quizz
Question.belongsTo(Quiz, {
    foreignKey: 'quiz_id',
    as: "quiz"
});

// un quizz possède plusieurs questions
Quiz.hasMany(Question, {
    foreignKey: 'quiz_id',
    as: "questions"
});

// Un QUIZZ appartient a Un User
Quiz.belongsTo(User, {
    //a travers la clé étrangere user_id
    foreignKey: 'user_id',
    //le user sera stocké dans une propriété 'author'
    as: 'author'
});

// si un quiz appartient a un user...
// alors on peut dire que un user a plusieurs quizz...
// dans le doute ====> MCD et cardinalités
User.hasMany(Quiz, {
    foreignKey: 'user_id',
    as: 'quizList'
});

// aie aie aie il nous reste le plus dur :
// la relation entre quiz et tag...
// Un quizz appartient a plusieurs tags.
// et un tag appartient a plusieurs quiz.

// un quizz possède plusieurs tags...
Quiz.belongsToMany(Tag, {
    as: 'tags',
    // a travers la table de liason qui s'apelle...
    through: 'quiz_has_tag',
    // le nom de quiz (la gauche de belongsToMany) dans la table de liaison
    foreignKey: 'quiz_id',
    // la clé de "l'autre" (ici Tag)
    otherKey: 'tag_id'
});

// un tag possède plusieurs quiz
Tag.belongsToMany(Quiz, {
    as: 'quizList',
    // a travers la table de liaison
    through: 'quiz_has_tag',
    // la clé étrangère de tag est tag_id
    foreignKey: 'tag_id',
    // la clé de l'autre coté
    otherKey: 'quiz_id'
});

module.exports = { Answer, Level, Question, Quiz, Tag, User };