const express = require('express');
const adminController = require('./controllers/adminController');
const mainController = require('./controllers/mainController');
const quizController = require('./controllers/quizController');
const tagController = require('./controllers/tagController');
const userController = require('./controllers/userController');

const adminMiddleware = require('./middleware/adminMiddleware');
const visitorMiddleware = require('./middleware/visitorMiddleware');

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
router.get('/signup', visitorMiddleware, userController.signupPage);

// l'action de s'inscrire
router.post('/signup', userController.signupAction);

// la page pour se connecter
router.get('/login', visitorMiddleware, userController.loginPage);

// l'action de se connecter
router.post('/login', userController.loginAction);

// la route pour se déconnecter
router.get('/disconnect', userController.disconnect);

// une route pour voir son profil
router.get('/profile', userController.viewProfile);

// une route pour toutes les fonctionnalités de l'admin
router.get('/admin', adminMiddleware, adminController.viewAdminHome);

// une route pour la page d'administration
router.get('/admin/user', adminMiddleware, adminController.viewAdminUserPage);

// supprimer un utilisateur
router.get('/admin/user/delete/:id', adminMiddleware, adminController.deleteUserById);

// rendre un utilisateur admin
router.get('/admin/user/make_admin/:id', adminMiddleware, adminController.makeUserAdmin);

// la page pour créer un level (en chantier, je fais juste la vue);
router.get('/admin/level/create', adminMiddleware, adminController.viewCreateLevel);

// la route qui réagit au post d'une requete
router.post('/admin/level/create', adminMiddleware, adminController.createLevelAction);

// voir tous les levels
router.get('/admin/level', adminMiddleware, adminController.viewAdminLevelPage);

// supprimer un level
router.get('/admin/level/delete/:id', adminMiddleware, adminController.deleteLevelById);


module.exports = router;