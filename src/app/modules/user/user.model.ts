/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { userStatus } from './constant';
import { TUser, UserModel } from './user.interface';
const userSchema = new Schema<TUser, UserModel>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profileImg: {
            type: String,
            default: '',
        },
        address: {
            type: String,
            default: '',
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        status: {
            type: String,
            enum: userStatus,
            default: 'active',
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

userSchema.pre('save', async function (next) {
    const user = this;
    console.log('this--', this);
    // hash password
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
});

// set password = ''
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
userSchema.statics.isPasswordMatched = async function (
    password,
    hashedPassword,
) {
    console.log('first', password, hashedPassword);
    return await bcrypt.compare(password, hashedPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
