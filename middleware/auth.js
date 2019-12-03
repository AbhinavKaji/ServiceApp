const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    // try {
        const authHeader = req.header('Authorization');
        if(!authHeader){
            req.isAuth = false;
            return next();
        }
        const token = authHeader.split(' ')[1];
        if(!token || token ===""){
            req.isAuth = false;
            return next();
        }
        let decoded
        try {
            decoded = jwt.verify(token, 'thisismynewcourse');
        } catch (error) {
            req.isAuth = false;
            return next();
        }
        if(!decoded){
            req.isAuth = false;
            return next();
        }
        req.isAuth = true;
        req.userId = decoded.id;
        next();
    // } catch (e) {
    //     res.status(401).send({ error: 'Please authenticate.' });
    // }
}

module.exports = auth