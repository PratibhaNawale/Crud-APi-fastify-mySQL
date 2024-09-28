const mysql = require('mysql2');
const config = require('./constant.json');
const { query } = require('express');

const pool = mysql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASS,
    port: config.DB_PORT,
    database: config.DB_DATABASE
});

pool.getConnection((err) => {
    if (err) {
        console.log('Error connecting to db ', err.stack);
        process.exit(1);
    }
    console.log('Connected to db...');
});

const excuateQuery = (query, arryParams) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query(query, arryParams, (err, data) => {
                if (err) {
                    console.log('Error executing the query');
                    reject(err);
                }
                resolve(data);
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = { excuateQuery };
