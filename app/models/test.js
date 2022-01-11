const Level = require('./level');
const Quiz = require('./quiz');


const facile = new Level({
    id: 1,
    name: 'Facile'
});


const quizSurLaFamilleK = new Quiz({
    id: 1,
    title: '10 questions sur les karashian',
    description: 'Le quizz pour briller en soirée',
    user_id: 1
});

console.log(facile);
console.log(quizSurLaFamilleK);