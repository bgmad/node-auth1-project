module.exports = function(req, res, next) {
    console.log(req.session);
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json('You are not logged in');
    }
}