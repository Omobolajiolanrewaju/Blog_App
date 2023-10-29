const mongoose = require('mongoose');
const shortid = require('shortid');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Joi = require('joi');

dotenv.config();

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    firstName: { type: String, required: [true, 'Please enter your name']},
    lastName: {type: String, required: [true, 'Please enter your name']},
    email: { type: String, required: [true, 'Please enter an email.'], unique: true, lowercase: true},
    password: {type: String, required: [true, 'Please enter a password'], minlength: 6}
})


UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.SECRETKEY, {expiresIn: "1h"})
    return token
}


// before save
// UserSchema.pre('save', async function (next) {
//     const user = this;
//     const hash = await bcrypt.hash(this.password, 10);

//     this.password = hash;
//     next();
// })

// UserSchema.methods.isValidPassword = async function(password) {
//     const user = this;
//     const compare = await bcrypt.compare(password, user.password);

//     return compare;
// }

// after save

// before update

// after update

const UserModel = mongoose.model('user', UserSchema);

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    })

    return schema.validate(data)
};

module.exports = {
    UserModel,
    validate
};