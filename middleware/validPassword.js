const passSchema = require ('../models/password');

module.exports = (req, res, next) => {
    if (!passSchema.validate (req.body.password)) {
    res.status(400).json({ message: 'Le mot de passe doit contenir 8 caractères minimum, une majuscule, une miniscule, 2 chiffres minimum et être sans espace vides!'});
    } else {
    next();
    }
};