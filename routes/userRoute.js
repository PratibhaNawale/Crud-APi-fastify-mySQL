const user = require('./user')

async function routes(fastify) {
    fastify.get('/user', user.getAllUsers);
    fastify.get('/user/:id', user.getUserById);
    fastify.delete('/user/delete/:id', user.deleteUserById);
    fastify.post('/user/create', user.createUser),
        fastify.put('/user/update/:id', user.updateUser)
}
module.exports = routes