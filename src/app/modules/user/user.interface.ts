/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './constant';

export interface TUser {
    name: string;
    email: string;
    password: string;
    profileImg?: string;
    contactNo?: string;
    address?: string;
    status: 'active' | 'deActive';
    role: 'admin' | 'customer';
    isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
    //if passwords are matched
    isPasswordMatched(
        password: string,
        hashedPassword: string,
    ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
