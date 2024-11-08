const { query } = require("../database");

module.exports.getAllProducts = async function getAllProducts() {
    try {
      const allProducts = await query(`SELECT * FROM products`);
      return allProducts;
    } catch (error) {
      throw error;
    }
  };