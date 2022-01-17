# O'quiz

## Jour 7

Avant toute chose, il nous faudra un admin. Modifier un utilisateur de la base,
pour qu'il soit administrateur, comme ceci : 
`UPDATE "user" SET "role" = 'admin' WHERE id = 1;`

Note : pour rappel, le mot de passe de Philippe et Chuck est : **quizoclock**

### Déconnexion

Ce serait bien qu'un user puisse se déconnecter. Créer la route et le controleur pour gerer le bouton "se déconnecter" (/disconnect)

### Les petites bricoles...

Empecher l'accès aux routes /login et /signup si on est déja connecté.

### Page administrateur

Créer une page Admin qui répondre à l'url "/admin" et qui affiche l'ensemble des quizs (sous forme agréable pour une administration claire).

**Attention ! Bien entendu il faudrait empecher tout utilisateur non-admin d'accéder a cette page (donc en regardant le fameux req.session.user)... voir même pour les plus téméraires faire un adminMiddleware :)**

Ajouter une bouton supprimer à côté des quizs pour les supprimer (un à un).
La suppression doit répondre à la route "/admin/quiz/delete/:id".
Ici aussi, on va protéger notre route.

Spoiler
MEGA BONUS (peut être long)

Créer une page pour ajouter un quiz à notre BDD. Si le quiz vous semble un trop, pourquoi pas une page pour créer un level ?

## Jour 4 : Atelier, Sprint 1

Fini les tests ! Maintenant qu'on a des super modèles, on va brancher tout ça dans notre archi Express !

### Visualiser les titres, les sous-titres et les auteurs des quiz sur la page d’accueil

Remplacer les fausses données "en dur", de la page d'accueil, par les données issues des Models !

Ici, se servir de la documentation Sequelize est une bonne idée (cf [les associations](https://sequelize.org/master/manual/eager-loading.html)).
Au revoir les dataMappers pour ce coup-ci !

### Pouvoir accéder aux questions d’un quiz

Il va falloir une nouvelle route (`/quiz/:id`).

Coder la méthode correspondante dans un nouveau controlleur (`quizController`).

Ici aussi, Sequelize va être bien pratique...

1. pouvoir visualiser la difficulté de chaque question

2. visualiser tous les sujets rattachés au quiz

### pouvoir visualiser tous les sujets

Nouvelle route (`/tags`)

Nouveau controller (`tagController`)

### pouvoir visualiser tous les quiz pour un sujet donné

Astuce : utiliser le model Tag, et se servir des "includes" de Sequelize pour en déduire les quiz concernés !

### :v: Bonus facile : Ajouter tous les liens qui pourraient manqués

Il y a surement des endroits où il serait intéressant de pouvoir cliquer, afin de rendre la navigation plus fluide.

### :skull_and_crossbones::clock4: Bonus de la mort où j'ai une semaine devant moi et je savais pas quoi faire : formulaires

Rajouter les formulaires d'inscription et de connexion.
Avec tout ce qui est nécessaire (Ajout en base de données, login en session plus ou moins longue)
