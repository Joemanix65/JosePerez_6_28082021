const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const passSchema = require ('../middleware/validPassword');

router.post('/signup', passSchema, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
