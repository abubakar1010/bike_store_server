import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import ApiError from '../../utils/apiError';

const loginUser = async (payload: TLoginUser) => {
    // checking if the user is exist
    console.log(payload)
    const user = await User.findOne({ email: payload.email });

    if (!user) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Credential!');
    }
    // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Your account is already deleted !');
    }

    // checking if the user is blocked

    const userStatus = user?.status;

    if (userStatus === 'deActive') {
        throw new ApiError(
            httpStatus.FORBIDDEN,
            'Your account is deactivated ! !',
        );
    }

    //checking if the password is correct

    console.log(user);

    if (!(await User.isPasswordMatched(payload?.password, user?.password)))
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid credential');

    //create token and sent to the  client

    const jwtPayload = {
        name: user.name,
        email: user.email,
        status: user.status,
        id: user._id,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
    );

    return {
        accessToken,
    };
};

const changePassword = async (
    userData: JwtPayload,
    payload: { currentPassword: string; newPassword: string },
) => {
    const user = await User.findOne({ email: userData.email });

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
        throw new ApiError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }


    const userStatus = user?.status;

    if (userStatus === 'deActive') {
        throw new ApiError(
            httpStatus.FORBIDDEN,
            'This user account is deActive',
        );
    }


    if (!(await User.isPasswordMatched(payload.currentPassword, user?.password)))
        throw new ApiError(httpStatus.FORBIDDEN, 'Password do not matched');

    //hash new password
    const newHashedPassword = await bcrypt.hash(
        payload.newPassword,
        Number(config.bcrypt_salt_rounds),
    );

    await User.findOneAndUpdate(
        {
            email: userData.email,
            role: userData.role,
        },
        {
            password: newHashedPassword,
        },
    );

    return null;
};

export const AuthServices = {
    loginUser,
    changePassword,
};
