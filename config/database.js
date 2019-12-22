const mongoose = require('mongoose');
const config = require('config');
const dbURI = config.get('mongoURI');

const connectDB = async () => {
    try {
        if (await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
        }
        )) {
            console.log("Database connected");
        }
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDB;