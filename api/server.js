const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('./users/router');
const authRouter = require('./auth/auth-router');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(session({
    name: 'monkey',
    secret: 'keep it secret, keep it safe!',
    cookie: {
        maxAge: 1000 * 60,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false
}));

server.use('/api/users', usersRouter);
server.use('/api/', authRouter);

server.use('/', (req, res) => {
    res.json({ api: 'up' });
});

module.exports = server;