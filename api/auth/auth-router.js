const express = require('express');
const User = require('../users/model');
const bcrypt = require('bcryptjs');
const router = express.Router();

// curl -d '{"username": "tester2", "password": "1234"}' -H 'Content-Type: Application/json' -X POST http://localhost:5000/api/register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashed = bcrypt.hashSync(password, 10);

    try {
        const user = await User.insert({ username, password: hashed });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err.message);
    };
});

// curl -d '{"username": "tester2", "password": "1234"}' -H 'Content-Type: Application/json' -X POST http://localhost:5000/api/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const allegedUser = await User.getByUsername(username).first();
        if (allegedUser && bcrypt.compareSync(password, allegedUser.password)) {
            req.session.user = allegedUser;
            console.log(req.session);
            res.json({ message: 'Welcome back!' });
        } else {
            res.status(401).json({ message: 'Invalid credentials'});
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
});

module.exports = router;