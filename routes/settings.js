const mongoose = require('mongoose');
const express = require('express');
const validateUser = require('../ctrls/auth');

const settingCtrl = require('../ctrls/settingCtrl');

const router = express.Router();

router.post('/settings', validateUser, settingCtrl.createSetting);
router.get('/settings', validateUser, settingCtrl.getSettings);
router.put('/settings/:settingId', validateUser, settingCtrl.updateSetting);
router.get('/settings/:settingId', validateUser, settingCtrl.getSetting);
router.delete('/settings/:settingId', validateUser, settingCtrl.deleteSetting);


module.exports = router;