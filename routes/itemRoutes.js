const express = require('express');
const router = new express.Router();
const ExpressError = require('../expressError')
const items = require('../fakeDb')

router.get('/', function(req , res) {
    return res.json(items)
})

router.post('/', function(req, res) {
    items.push(req.body)
    return res.status(201).json({"added": req.body})
})

router.get('/:name', function(req, res) {
    const item = items.find(item => item.name === req.params.name)
    if (!item) {
        throw new ExpressError('item not found', 404)
    }
    return res.json(item)
})

router.patch('/:name', function(req, res) {
    const item = items.find(item => item.name === req.params.name)
    if (!item) {
        throw new ExpressError('item not found', 404)
    }
    item.name = req.body.name
    item.price = req.body.price
    return res.json({"updated": item})
})

router.delete('/:name', function(req, res) {
    const itemIndex = items.findIndex(item => item.name === req.params.name)
    if (itemIndex === -1) {
        throw new ExpressError('item not found', 404)
    }
    const splicedItem = items.splice(itemIndex, 1)[0]
    return res.json({"deleted": splicedItem})
})

module.exports = router;