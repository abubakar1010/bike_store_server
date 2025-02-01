import httpStatus from 'http-status';
import { AuthServices } from './auth.service';
import handleAsync from '../../utils/handleAsync';
import apiResponse from '../../utils/apiResponse';

const loginUser = handleAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    const { accessToken } = result;

    apiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is logged in successfully!',
        data: {
            accessToken,
        },
    });
});

const changePassword = handleAsync(async (req, res) => {
    const { ...passwordData } = req.body;

    const result = await AuthServices.changePassword(req.user, passwordData);
    apiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password is updated successfully!',
        data: result,
    });
});

export const AuthControllers = {
    loginUser,
    changePassword,
};
