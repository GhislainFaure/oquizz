// on va charger nos variables d'environnement
require('dotenv').config();

// ici on require app/models
// comme c'est un dossier, cela revient a
// require app/models/index
const { Answer, Level, Question, Quiz, Tag, User } = require('./app/models');


async function test() {
    // essayons de récupérer un Quiz...
    // et tant qu'a faire je voudrais TOUT
    // son user, ses questions, ses tags
    const premierQuiz = await Quiz.findByPk(1, {
        include: [
            'author',
            'tags',
            // cas particulier, si dans une association...
            // je veux ENCORE d'autres associations "filles"
            {
                association: 'questions',
                // dans include, je met les relations du 2eme étage que je veux
                include: ['level', 'answers', 'good_answer']
            }
        ]
    });

    console.log(premierQuiz.title);
    console.log(premierQuiz.author.firstname);
    console.log('la premiere question: ', premierQuiz.questions[0].question);
    console.log('la premiere reponse de la premire question : ', premierQuiz.questions[0].answers[0].description);
    console.log('le niveau de la premiere question :', premierQuiz.questions[0].level.name);
    console.log('la bonne réponse a la premier question', premierQuiz.questions[0].good_answer.description);
    console.log('le premier tag: ', premierQuiz.tags[0].name);
}

test();


