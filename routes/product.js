const { excuateQuery } = require('../config/db');

// Get all products

const getAllProducts = async (req, reply) => {
    try {
        const productData = await excuateQuery('SELECT * FROM product', []);
        reply.status(200).send(productData);
    } catch (err) {
        reply.status(500).send(err);
    }
};

// Get product by ID

const getAllProductsById = async (req, reply) => {
    const id = req.params.id;
    try {
        const productData = await excuateQuery('SELECT * FROM product WHERE id = ?', [id]);
        if (productData.length === 0) {
            return reply.status(404).send({ message: 'Product not found' });
        }
        reply.status(200).send(productData[0]);
    } catch (err) {
        reply.status(500).send(err);
    }
};

// Create a new product

const createProduct = async (req, reply) => {
    const { image, name, prize } = req.body;
    try {
        const result = await excuateQuery('INSERT INTO product (image, name, prize) VALUES (?, ?, ?)', [image, name, prize]);
        reply.status(201).send({ id: result.insertId, image, name, prize });
    } catch (err) {
        reply.status(500).send(err);
    }
};

// Update a product by ID

const updateProduct = async (req, reply) => {
    const id = req.params.id;
    const { image, name, prize } = req.body;
    try {
        const result = await excuateQuery('UPDATE product SET image = ?, name = ?, prize = ? WHERE id = ?', [image, name, prize, id]);
        if (result.affectedRows === 0) {
            return reply.status(404).send({ message: 'Product not found' });
        }
        reply.status(200).send({ id, image, name, prize });
    } catch (err) {
        reply.status(500).send(err);
    }
};

// Delete a product by ID

const deleteProduct = async (req, reply) => {
    const id = req.params.id;
    try {
        const result = await excuateQuery('DELETE FROM product WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return reply.status(404).send({ message: 'Product not found' });
        }
        reply.status(204).send();
    } catch (err) {
        reply.status(500).send(err);
    }
};

module.exports = {
    getAllProducts,
    getAllProductsById,
    createProduct,
    updateProduct,
    deleteProduct,
};
