const {UserModel, validate} = require('../models/user.model');
const logger = require('../logger');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const signUpHandler = async (req, res) => {
    try {
        res.render("signup")
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({
            message: 'Server Error',
            data: null
        })
    }
}

const loginHandler = async (req, res) => {
    try {
        res.render("login")
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({
            message: 'Server Error',
            data: null
        })
    }
}

const sigupValidation = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message});
        }

        const user = await UserModel.findOne({ email: req.body.email});
        if (user) {
            return res.status(409).send({ message: "User with given email already exist!"})
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new UserModel({...req.body, password: hashPassword}).save();
        return res.redirect('/login')
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error"});
    }
}

const loginValidation = async (req, res) => {
    try {
        const { error } = validateLogin(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        
        const user = await UserModel.findOne({ email: req.body.email });
        if(!user) {
            return res.status(401).send({ message: "Invalid Email or Password" });
        }

        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        );
        if(!validPassword){
            return res.status(401).send({ message: "Invalid Email or Password" });
        }

        const token = jwt.sign({ email: user.email, _id: user._id}, process.env.SECRETKEY, {expiresIn: "1m"})
        req.data = token;

        return res.cookie('data', req.data, {maxAge: 3600000, httpOnly:true}).redirect('/draft')
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error"});
    }
}


const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    });
    return schema.validate(data);
}

module.exports = {
    signUpHandler,
    loginHandler,
    sigupValidation,
    loginValidation
}