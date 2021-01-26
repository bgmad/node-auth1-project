const express = require('express');
const protected = require('../auth/auth-middleware');
const User = require('./model');

const router = express.Router();

router.get('/', protected, async (req, res) => {
    try {
        const users = await User.getAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(404).json({ message: 'something went wrong' })
    }
});


module.exports = router;