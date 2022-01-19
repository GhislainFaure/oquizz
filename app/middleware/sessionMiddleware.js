// un middleware pour stocker la session dans les locals
// afin de pouvoir accéder a l'utilisateur dans nos vues

function sessionMiddleware(req, res, next) {
    // je place session.user dans mon objet locals
    res.locals.user = req.session.user;
    next();
}

module.exports = sessionMiddleware;