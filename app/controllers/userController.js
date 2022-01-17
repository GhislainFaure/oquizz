const validator = require("email-validator");
const bcrypt = require('bcrypt');

const { User } = require("../models");

const userController = {
    signupPage(req, res) {
        res.render('signup');
    },

    async signupAction(req, res) {
        console.log('dans le body jai : ', req.body);

        // je dois faire quoi ici ?
        // l'objectif est de créer un utilisateur dans la base de donnée.
        // attention : je sais que je ne dois pas stocker le mot de passe tel quel
        // donc il faudra chiffrer le mot de passe
        // je sais que l'utilisateur a un role par défaut : user

        // il faudrait vérifier que le passwordConfirm est égal au password
        // il faudrait vérifier que l'utilisateur n'existe pas déja (c'est a dire que l'email n'est pas pris)
        // il faudrait vérifier que l'email... est valide
        // on pourrait vérifier que toutes les données sont remplies

        // 1ere vérif : l'utilisateur existe déja
        const existingUser = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (existingUser) {
            // un user existe avec cet email, on arrête tout
            return res.render('signup', { error: 'Cet email est déjà utilisé par un compte' });
        }

        // 2eme vérif : vérifier que l'email est valide.
        if (!validator.validate(req.body.email)) {
            return res.render('signup', { error: "Cet email n'est pas valide" });
        }

        // 3eme verif : mot de passe et confirmation sont identiques
        if (req.body.password !== req.body.passwordConfirm) {
            return res.render('signup', {
                error: "La confirmation du mot de passe ne correspond pas."
            });
        }
        // Si on voulait aller plus loin : mot de passe de plus de 6 caracteres, avec un caractere spécial et un chiffre etc etc


        // si je suis rendu ici...
        // c'est que les données de mon formulaire sont OK !
        // je peux désormais créer mon utilisateur !!!!

        // avec le package bcrypt, je vais chiffrer mon mot de passe, avec 
        // une "intensité" de 10
        const encryptedPwd = bcrypt.hashSync(req.body.password, 10);

        let newUser = new User({
            email: req.body.email,
            // c'est le mot de passe chiffré que l'on stockera en DB
            password: encryptedPwd,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });

        await newUser.save();

        res.redirect('/login');
    },

    loginPage(req, res) {
        res.render('login');
    },

    async loginAction(req, res) {
        // connecter un utilisateur

        // 1ere verif : est-ce que l'utilisateur existe dans la BDD
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        // si on ne trouve pas d'utilisateur avec cet email...
        if (!user) {
            // un user existe avec cet email, on arrête tout
            return res.render('login', { error: "Mauvais email ou mot de passe" });
        }

        // ensuite, on va vérifier le mot de passe saisi avec bcrypt.compareSync
        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

        // si le mot de passe n'est pas bon, il faudrait le dire a l'utilisateur
        if (!isPasswordValid) {
            return res.render('login', {
                error: "Mauvais email ou mot de passe"
            });
        }

        // si on arrive ici, le mot de passe est bon...
        // et du coup ? on fait quoi ?
        // on va stocker dans la session de l'utilisateur qui il est.
        req.session.user = {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            // je ne donne pas le mdp, pas besoin dans la session !
        };

        // nous voila connectés... 
        // on redirige sur la page d'accueil
        res.redirect('/');
    },

    viewProfile(req, res) {
        // ici, je peux récupérer la session pour savoir
        // quel est l'utilisateur

        res.json(req.session.user);
    }
}

module.exports = userController;
