const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')[1];
        if(!token || token ===""){
            req.isAuth = false;
            return next();
        }
        const decoded = jwt.verify(token, 'thisismynewcourse');
        if(!decoded){
            req.isAuth = false;
            return next();
        }
        req.isAuth = true;
        req.userId = decoded.userId;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
}

module.exports = auth