const db = require('../../data/db-configs');

const getAll = () => {
    return db('users');
};

const getById = id => {
    return db('users')
        .where({ userId: id });
};

const getByUsername = username => {
    return db('users')
        .where({ username });
};

const insert = async record => {
    try {
        const [id] = await db('users').insert(record);
        const user = await db('users').where({ userId: id });
        return user;
    } catch (err) {
        return err;
    };
};

module.exports = {
    getAll,
    getById,
    getByUsername,
    insert
}