// un middleware qui ne next que si on est connecté, et que notre role est bien admin

function adminMiddleware(req, res, next) {
    // si pas connecté du tout ===> je renvoie une 401
    if (!req.session.user) {
        return res.status(401).send('Connecte toi stp');
    }

    // si connecté mais pas admin ===> je renvoie une 403
    if (req.session.user.role !== 'admin') {
        return res.status(403).send('Tu tes cru ou ? tu nes pas admin');
    }

    next();
}

module.exports = adminMiddleware;