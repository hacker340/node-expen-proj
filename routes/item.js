const express = require('express');
const itemCtrl = require('../ctrls/itemCtrl');
const validateUser = require('../ctrls/auth');

const router = express.Router();

router.post('/items', validateUser, itemCtrl.createItem);
router.get('/items', validateUser, itemCtrl.getItems);
router.put('/items/:itemId', validateUser, itemCtrl.updateItem);
router.get('/items/:itemId', validateUser, itemCtrl.getItem);
router.delete('/items/:itemId', validateUser, itemCtrl.deleteItem);


module.exports = router;