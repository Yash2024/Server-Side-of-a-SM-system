const products = require('../models/Product.model.js');

// Create and Save a new employee
exports.create = (req, res) => {

    // Validate request
    if (!req.body.pname) {
        return res.status(400).send({
            message: "Product name can not be empty"
        });
    }

    // Create a Employee
    const pro = new products({
        pid: req.body.pid,
        pname: req.body.pname,
        price: req.body.price,
        description: req.body.description
    });

    // Save Employee in the database
    pro.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Product."
            });
        });
};

// Retrieve and return all employees from the database.
exports.findAll = (req, res) => {
    products.find()
    .then(prdList => {
        res.send(prdList);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving product list."
        });
    });
};

// Find a single employee with a id
exports.findOne = (req, res) => {
    // products.findOne(req.params.pid)
    // .then(prd => {
    //     if(!prd) {
    //         return res.status(404).send({
    //             message: "Product not found with id " + req.params.pid
    //         });            
    //     }
    //     res.send(prd);
    // }).catch(err => {
    //     if(err.kind === 'ObjectId') {
    //         return res.status(404).send({
    //             message: "Product not found with id " + req.params.pid
    //         });                
    //     }
    //     return res.status(500).send({
    //         message: "Error retrieving product with id " + req.params.pid
    //     });
    // });
    products.findById(req.params.pid)
    .then(prd => {
        if(!prd) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.pid
            });            
        }
        res.send(prd);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.pid
            });                
        }
        return res.status(500).send({
            message: "Error retrieving product with id " + req.params.pid
        });
    });
};

// Update a employee identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.pid) {
        return res.status(400).send({
            message: "Product id can not be empty"
        });
    }

    // Find note and update it with the request body
    products.findByIdAndUpdate(req.params.pid, {
        pid: req.body.pid,
        pname: req.body.pname,
        price: req.body.price,
        description: req.body.description
    }, {new: true})
    .then(prd => {
        if(!prd) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.pid
            });
        }
        res.send(prd);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.pid
            });                
        }
        return res.status(500).send({
            message: "Error updating product with id " + req.params.pid
        });
    });
};

// Delete a employee with the specified id in the request
exports.delete = (req, res) => {
    products.findByIdAndRemove(req.params.pid)
    .then(prd => {
        if(!prd) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.pid
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.pid
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.pid
        });
    });
};
