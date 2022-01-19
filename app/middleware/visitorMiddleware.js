// un middleware qui ne next que si on est PAS connecté
// c'est a dire que l'on est un VISITEUR

function visitorMiddleware(req, res, next) {
    // si je suis déja connecté
    // c'est a dire si j'ai un user dans ma session
    if (req.session.user) {
        // je redirige, interdiction d'être ici
        return res.redirect('/');
    }

    next();
}

module.exports = visitorMiddleware;