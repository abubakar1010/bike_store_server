import httpStatus from 'http-status';
import { UserServices } from './user.service';
import handleAsync from '../../utils/handleAsync';
import apiResponse from '../../utils/apiResponse';

const createUser = handleAsync(async (req, res) => {
    const userData = req.body;

    const result = await UserServices.createUserIntoDB( userData);

    apiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is created successfully',
        data: result,
    });
});

const getSingleUser = handleAsync(async (req, res) => {
    const { id } = req.params;
    const result = await UserServices.getSingleUserFromDB(id);

    apiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is retrieved successfully',
        data: result,
    });
});

const getAllUsers = handleAsync(async (req, res) => {
    const result = await UserServices.getAllUsersFromDB(req.query);

    apiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User are retrieved successfully',
        meta: result.meta,
        data: result.result,
    });
});

const updateUser = handleAsync(async (req, res) => {
    const { id } = req.params;
    const userData = req.body;
    const result = await UserServices.updateUserIntoDB(id, userData);

    apiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is updated successfully',
        data: result,
    });
});

const deleteUser = handleAsync(async (req, res) => {
    const { id } = req.params;
    const result = await UserServices.deleteUserFromDB(id);

    apiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is deleted successfully',
        data: result,
    });
});

const changeStatus = handleAsync(async (req, res) => {


    const result = await UserServices.changeStatus(req.body);

    apiResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Status is updated successfully',
        data: result,
    });
});

export const UserControllers = {
    createUser,
    changeStatus,
    getAllUsers,
    getSingleUser,
    deleteUser,
    updateUser,
};
