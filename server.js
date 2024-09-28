const fastify = require('fastify')();
const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');
const fastifyCors = require('@fastify/cors');
fastify.register(fastifyCors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
});
require('dotenv').config();

fastify.register(userRoutes);
fastify.register(productRoutes);
const startServer = async () => {
    try {
        await fastify.listen({ port: 3010 });
        console.log(`Server is running on port 3010`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

startServer();
