const express = require('express');
const httpStatusCodes = require('http-status-codes');
const router = express.Router();
const user = require('../models/user.model');

//chain function calling
router.get('/', (req, res) => {
    user.find().then(docs => {
        res.send(docs);
    }).catch(err => {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(err);
    });    
}).get('/:id', (req, res) => {
    let id = req.params.id;
    user.findById(id).then(doc => {
        res.send(doc);
    }).catch(err => {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(err);
    }); 
}); 

//separte function calling
router.post('/', (req, res) => {
    const obj = req.body;
    user.create(obj).then(doc => {
        res.status(httpStatusCodes.CREATED).send(doc);
    }).catch(err => {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(err);
    });
});


router.put('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const obj = req.body;
        const updatedUser = await user.findByIdAndUpdate(id, { name: obj.name, contact:obj.contact, address:obj.address });
        res.status(httpStatusCodes.OK).send(updatedUser);
    } catch (err) {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(err);
    }
});


router.delete('/:id', (req, res) => {
    let id = req.params.id;
    user.findByIdAndDelete(id).then(doc => {
        res.status(httpStatusCodes.OK).send(doc);
    }).catch(err => {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(err);
    });
});

module.exports = router;