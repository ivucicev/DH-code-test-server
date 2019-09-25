import mongoose from 'mongoose';
import * as Bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const validateEmail = (email: string) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const validatePassword = (password: string) => {
    const re = /^(?=.*\d).{6,}$/;
    return re.test(password);
};

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        validate: [
            validatePassword,
            'Password should be at least 6 characters long with minimum of 1 numeric character'
        ],
        match: [
            /^(?=.*\d).{6,}$/,
            'Password should be at least 6 characters long with minimum of 1 numeric character'
        ]
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [
            validateEmail,
            'Please make sure your email address is valid'
        ],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please make sure your email address is valid'
        ]
    }
});

userSchema.pre('save', function(next) {
    (this as any).password = Bcrypt.hashSync((this as any).password);
    next();
});

export const User = mongoose.model('User', userSchema);
