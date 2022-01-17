const express = require('express');
const mainController = require('./controllers/mainController');
const quizController = require('./controllers/quizController');
const tagController = require('./controllers/tagController');
const userController = require('./controllers/userController');

const router = express.Router();

// la page d'accueil
router.get('/', mainController.homePage);

// la page pour voir UN quiz
router.get('/quiz/:id', quizController.viewOneQuiz);

// la page pour voir tous les tags
router.get('/tags', tagController.viewTags);

// la page pour voir les quiz d'un tag
router.get('/tag/:id', tagController.viewAllQuizOfTag);

// la page pour s'inscrire
router.get('/signup', userController.signupPage);

// l'action de s'inscrire
router.post('/signup', userController.signupAction);

// la page pour se connecter
router.get('/login', userController.loginPage);

// l'action de se connecter
router.post('/login', userController.loginAction);

// une route pour voir son profil
router.get('/profile', userController.viewProfile);

module.exports = router;