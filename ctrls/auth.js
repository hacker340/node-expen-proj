const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // console.log(req.headers);
    const headers = req.headers;
    // const token = headers['authentication'].split(' ')[1];
    // console.log(token);
    if (headers.uid) {
        req.userId = headers.uid;
    } else {
        res.status(401).send("Access denied");
    }
    next();
}