const mongoose = require('mongoose');
const express = require('express');
const validateUser = require('../ctrls/auth');

const categoryCtrl = require('../ctrls/categoryCtrl');

const router = express.Router();

router.post('/categories', validateUser, categoryCtrl.createCategory);
router.get('/categories', validateUser, categoryCtrl.getCategories);
router.put('/categories/:categoryId', validateUser, categoryCtrl.updateCategory);
router.get('/categories/:categoryId', validateUser, categoryCtrl.getCategory);
router.delete('/categories/:categoryId', validateUser, categoryCtrl.deleteCategory);


module.exports = router;