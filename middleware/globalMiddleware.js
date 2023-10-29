const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const UserModel = require('../models/user.model')

dotenv.config()

const authRoute = async (req, res, next) => {
    if( req.cookies.data ){
        const verify = jwt.verify(req.cookies.data, process.env.SECRETKEY);
        next()
    }else {
        return res.redirect('/')
    }
}

module.exports = {
    authRoute,
}