var express = require('express');
var router = express.Router();
let categorySchema = require('../schema/category');

router.get('/', async function (req, res, next) {
    let categories = await categorySchema.find({ isdeleted: false });
    res.send(categories);
});
router.post('/', async function (req, res, next) {
    try {
        let body = req.body;
        let category = new categorySchema(
            {
                name: body.name,
                description: body.description
            }
        );
        await category.save();
        res.send(category);
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        });
    }
});
router.get('/:id', async function (req, res, next) {
    try {
        let category = await categorySchema.findById(req.params.id);
        res.send(category);
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
        if (body.description) obj.description = body.description;
        let updateCategory = await categorySchema.findByIdAndUpdate(req.params.id, obj, { new: true });
        res.send(updateCategory);
    } catch (error) {
        res.status(404).send({
            success: false,
            message: error.message
        });
    }
});
router.put('/delete/:id', async function (req, res, next) {
    try {
        let category = await categorySchema.findById(req.params.id);
        category.isdeleted = true;
        await category.save();
        res.send(category);
    } catch (error) {
        res.status(404).send({
            success: false,
            message: error.message
        });
    }
});
router.delete('/', async function (req, res, next) {
    try {
        await categorySchema.find({ isdeleted: true }).deleteMany();
        res.send({
            success: true,
            message: 'Category deleted successfully'
        });
    } catch (error) {
        res.status(404).send({
            success: false,
            message: error.message
        });
    }
});
module.exports = router;