const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema(
    {
        'name': {
            type: String,
            required: true,
            trim: true
        },
        'username': {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        'email': {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid')
                }
            }
        },
        'password': {
            type: String,
            required: true,
            minlength: 8,
            trim: true,
            validate(value) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error('Not secure')
                }
            }
        },
        'tokens': [{
            token: {
                type: String,
                required: true
            }
        }],
        'avatar': {
            type: Buffer
        }
    },
    {
        timestamps: true
    }
)

userSchema.virtual('recipes', {
    ref: 'Recipe',
    localField: '_id',
    foreignField: 'user'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

//Generate token for user
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username })

    if (!user) {
        throw new Error ('User does not exist')
    } const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Invalid username or password')
    }

    return user;
}

//Hash the plain password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    console.log('Just before saving...')

    next()
})

//Runs before removing or deleting
userSchema.pre('remove', async function (next) {
    const user = this

    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User