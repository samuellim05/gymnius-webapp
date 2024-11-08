const express = require('express');
const { getAllProducts } = require('../models/productModel')
const router = express.Router();

router.get('/getAllProducts', async function (req, res, next) {
        getAllProducts()
            .then(function (allProducts) {
                const productsData = allProducts.rows;
                return res.status(200).json(productsData);
            })
            .catch(function (error) {
                console.error(error)
            });
});

module.exports = router;
