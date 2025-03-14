var express = require('express');
var router = express.Router();
let productSchema = require('../schema/product');

/* GET home page. */
router.get('/', async function (req, res, next) {
    let products = await productSchema.find({});
    res.send(products);
});
router.post('/', async function (req, res, next) {
    try {
        let body = req.body;
        let product = new productSchema(
            {
                name: body.name,
                quantity: body.quantity ? body.quantity : 0,
                price: body.price ? body.price : 0,
                description: body.description,
                imgURL: body.imgURL,
                category: body.category
            }
        );
        await product.save();
        res.send(product);
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        });
    }
});
router.get('/:id', async function (req, res, next) {
    try {
        let product = await productSchema.findById(req.params.id);
        res.send(product);
    } catch (error) {
        res.status(404).send({
            success: false,
            message: error.message
        });
    }
});
router.put('/:id', async function (req, res, next) {
    try {
        let body = req.body;
        let obj = {};
        if (body.name) obj.name = body.name;
        if (body.quantity) obj.quantity = body.quantity;
        if (body.price) obj.price = body.price;
        if (body.description) obj.description = body.description;
        if (body.imgURL) obj.imgURL = body.imgURL;
        if (body.category) obj.category = body.category;
        let updateProduct = await productSchema.findByIdAndUpdate(req.params.id, obj, { new: true });
        res.send(updateProduct);
    } catch (error) {
        res.status(404).send({
            success: false,
            message: error.message
        });
    }
});
router.delete('/:id', async function (req, res, next) {
    try {
        await productSchema.findByIdAndDelete(req.params.id);
        res.send({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(404).send({
            success: false,
            message: error.message
        });
    }   
});

module.exports = router;
