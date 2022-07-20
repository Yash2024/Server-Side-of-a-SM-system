module.exports = (app) => {
    const Product = require('../controllers/Product.controller.js');

    // Create a new Employee
    app.post('/api/product/addproduct', Product.create);

    // Retrieve all EmployeeList
    app.get('/api/product/getproductList', Product.findAll);

    // Retrieve a single Employee with noteId
    app.get('/api/product/getproduct/:pid', Product.findOne);

    // Update a Employee with id
    app.put('/api/product/updateproduct/:pid', Product.update);

    // Delete a Employee with id
    app.delete('/api/product/deleteproduct/:pid', Product.delete);
}