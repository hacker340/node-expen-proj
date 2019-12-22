const ItemModel = require('../models/item');

module.exports.createItem = async (req, res) => {
    if (req.body && req.userId) {
        try {
            const data = req.body;
            data.userId = req.userId;
            const doc = await ItemModel.create(data);
            if (doc) res.send({ msg: 'Create successfully!', data: doc });
        } catch (err) {
            console.error(err);
            res.status(500).send({ msg: 'Internal server error', err });
        }
    } else {
        res.status(401).send({ msg: 'Missing required fields' });
    }
}


module.exports.updateItem = async (req, res) => {
    if (req.params.itemId) {
        try {
            const doc = await ItemModel.findByIdAndUpdate({ _id: req.params.itemId }, { $set: req.body }, { new: true })
                .exec();
            if (doc) {
                const data = await ItemModel.findById(req.params.itemId).exec();
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


module.exports.deleteItem = async (req, res) => {
    if (req.params.itemId) {
        try {
            const doc = await ItemModel.findByIdAndDelete(req.params.itemId).exec();
            if (doc) res.send({ msg: 'Deleted successfully!', data: doc });
        } catch (err) {
            console.error(err);
            res.status(500).send({ msg: 'Internal server error', err });
        }
    } else {
        res.status(401).send({ msg: 'Missing required fields' });
    }
}

module.exports.getItem = async (req, res) => {
    if (req.params.itemId) {
        try {
            const doc = await ItemModel.findById(req.params.itemId)
                .populate('category')
                .exec();
            if (doc) res.send({ msg: 'Query successfull!', data: doc });
        } catch (err) {
            console.error(err);
            res.status(500).send({ msg: 'Internal server error', err });
        }
    } else {
        res.status(401).send({ msg: 'Missing required fields' });
    }

}

module.exports.getItems = async (req, res) => {
    if (req.userId) {
        const where = { userId: req.userId };
        if ('isDeleted' in req.query) where.isDeleted = req.query.isDeleted;
        const docs = await ItemModel.find(where)
            .populate('category')
            .exec();
        res.send({ msg: 'Query successfully', data: docs });
    } else {
        res.status(401).send({ msg: 'Missing required fields' });
    }
}