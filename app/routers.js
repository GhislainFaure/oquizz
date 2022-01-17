const express = require('express');
const mainController = require('./controllers/mainController');
const quizController = require('./controllers/quizController');
const tagController = require('./controllers/tagController');

const router = express.Router();

// la page d'accueil
router.get('/', mainController.homePage);

// la page pour voir UN quiz
router.get('/quiz/:id', quizController.viewOneQuiz);

// la page pour voir tous les tags
router.get('/tags', tagController.viewTags);

module.exports = router;