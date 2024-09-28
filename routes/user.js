const { excuateQuery } = require('../config/db');

//getUser

const getAllUsers = async (req, reply) => {
    try {
        let userData = await excuateQuery('SELECT * FROM users', []);
        reply.status(200).send(userData);
    } catch (err) {
        reply.status(500).send(err);
    }
};

//getUserById

const getUserById = async (req, reply) => {
    let id = req.params.id;
    try {
        let userData = await excuateQuery('SELECT * FROM users where id=?', [id]);
        reply.status(200).send(userData);
    } catch (err) {
        reply.status(500).send(err);
    }
};

//delete User

const deleteUserById = async (req, reply) => {
    let id = req.params.id;
    try {
        let userData = await excuateQuery('delete  FROM users where id=?', [id]);
        reply.status(200).send(userData, { message: 'User deleted successfully' });
    } catch (err) {
        reply.status(500).send(err);
    }
};

//create user

const createUser = async (req, reply) => {
    const { name, email, password } = req.body;
    try {
        const result = await excuateQuery('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
        reply.status(201).send({ message: 'User created successfully', userId: result.insertId });
    } catch (err) {
        reply.status(500).send(err);
    }
};

//update user

const updateUser = async (req, reply) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    try {
        const result = await excuateQuery('UPDATE users SET name=?, email=?, password=? WHERE id=?', [name, email, password, id]);
        if (result.affectedRows > 0) {
            reply.status(200).send({ message: 'User updated successfully' });
        } else {
            reply.status(404).send({ message: 'User not found' });
        }
    } catch (err) {
        reply.status(500).send(err);
    }
};


module.exports = {
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    deleteUserById: deleteUserById,
    createUser: createUser,
    updateUser: updateUser
};

