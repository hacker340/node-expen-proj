const CategoryModel = require('../models/category');

module.exports.createCategory = async (req, res) => {
    if (req.body && req.userId) {
        try {
            const data = req.body;
            data.userId = req.userId;
            const doc = await CategoryModel.create(data);
            if (doc) res.send({ msg: 'Create successfully!', data: doc });
        } catch (err) {
            console.error(err);
            res.status(500).send({ msg: 'Internal server error', err });
        }
    } else {
        res.status(401).send({ msg: 'Missing required fields' });
    }
}


module.exports.updateCategory = async (req, res) => {
    if (req.params.categoryId) {
        try {
            const doc = await CategoryModel.findByIdAndUpdate({ _id: req.params.categoryId }, { $set: req.body }, { new: true })
                .exec();
            if (doc) {
                const data = await CategoryModel.findById(req.params.categoryId).exec();
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


module.exports.deleteCategory = async (req, res) => {
    if (req.params.categoryId) {
        try {
            const doc = await CategoryModel.findByIdAndDelete(req.params.categoryId).exec();
            if (doc) res.send({ msg: 'Deleted successfully!', data: doc });
        } catch (err) {
            console.error(err);
            res.status(500).send({ msg: 'Internal server error', err });
        }
    } else {
        res.status(401).send({ msg: 'Missing required fields' });
    }
}

module.exports.getCategory = async (req, res) => {
    if (req.params.categoryId) {
        try {
            const doc = await CategoryModel.findById(req.params.categoryId).exec();
            if (doc) res.send({ msg: 'Query successfull!', data: doc });
        } catch (err) {
            console.error(err);
            res.status(500).send({ msg: 'Internal server error', err });
        }
    } else {
        res.status(401).send({ msg: 'Missing required fields' });
    }

}

module.exports.getCategories = async (req, res) => {
    if (req.userId) {
        const where = { userId: req.userId };
        if ('isDeleted' in req.query) where.isDeleted = req.query.isDeleted;
        const docs = await CategoryModel.find(where)
            .exec();
        res.send({ msg: 'Query successfully', data: docs });
    } else {
        res.status(401).send({ msg: 'Missing required fields' });
    }
}