const SettingModel = require('../models/setting');

module.exports.createSetting = async (req, res) => {
    if (req.body && req.userId) {
        try {
            const data = req.body;
            data.userId = req.userId;
            const doc = await SettingModel.create(data);
            if (doc) res.send({ msg: 'Create successfully!', data: doc });
        } catch (err) {
            console.error(err);
            res.status(500).send({ msg: 'Internal server error', err });
        }
    } else {
        res.status(401).send({ msg: 'Missing required fields' });
    }
}


module.exports.updateSetting = async (req, res) => {
    if (req.params.settingId) {
        try {
            const doc = await SettingModel.findByIdAndUpdate({ _id: req.params.settingId }, { $set: req.body }, { new: true })
                .exec();
            if (doc) {
                const data = await SettingModel.findById(req.params.settingId).exec();
                res.send({ msg: 'Updated successfully!', data: data });
            }
            else {
                res.status(404).send({ msg: 'Data not found', err });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send({ msg: 'Internal server error', err });
        }
    } else {
        res.status(401).send({ msg: 'Missing required fields' });
    }
}


module.exports.deleteSetting = async (req, res) => {
    if (req.params.settingId) {
        try {
            const doc = await SettingModel.findByIdAndDelete(req.params.settingId).exec();
            if (doc) res.send({ msg: 'Deleted successfully!', data: doc });
        } catch (err) {
            console.error(err);
            res.status(500).send({ msg: 'Internal server error', err });
        }
    } else {
        res.status(401).send({ msg: 'Missing required fields' });
    }
}

module.exports.getSetting = async (req, res) => {
    if (req.params.settingId) {
        try {
            const doc = await SettingModel.findById(req.params.settingId).exec();
            if (doc) res.send({ msg: 'Query successfull!', data: doc });
        } catch (err) {
            console.error(err);
            res.status(500).send({ msg: 'Internal server error', err });
        }
    } else {
        res.status(401).send({ msg: 'Missing required fields' });
    }

}

module.exports.getSettings = async (req, res) => {
    if (req.userId) {
        const where = { userId: req.userId };
        const docs = await SettingModel.find(where)
            .exec();
        res.send({ msg: 'Query successfully', data: docs });
    } else {
        res.status(401).send({ msg: 'Missing required fields' });
    }
}