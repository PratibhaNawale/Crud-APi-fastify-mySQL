const product = require('./product')
const fastify = require('fastify')();
const fastifyMultipart = require('fastify-multipart');
fastify.register(fastifyMultipart);

async function routes(fastify) {
    fastify.get('/product', product.getAllProducts);
    fastify.get('/product/:id', product.getAllProductsById);
    fastify.delete('/product/delete/:id', product.deleteProduct);
    fastify.put('/product/update/:id', product.updateProduct);
    fastify.post('/product/create', product.createProduct)



}
module.exports = routes