const express = require('express');
const cors = require('cors');

const connectDB = require('./config/database');
const categoryRouter = require('./routes/category');
const itemRouter = require('./routes/item');
const settingRouter = require('./routes/settings');

connectDB();

const app = express();

app.use(cors());
app.use(express.json({ extended: true }));

app.use('/category/api', categoryRouter);
app.use('/item/api', itemRouter);
app.use('/setting/api', settingRouter);


app.use('**', (req, res) => {
    res.send('API not found');
});



const PORT = process.env.PORT || 3000;








app.listen(PORT, () => {
    console.log('Server is running ' + PORT);
});
