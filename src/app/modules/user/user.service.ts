/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../utils/apiError';
import { User } from './user.model';
import QueryBuilder from '../../utils/queryBuilder';
import { userSearchableFields } from './constant';
import { TUser } from './user.interface';

const createUserIntoDB = async ( payload: TUser) => {
    // create a user
    const newUser = await User.create(payload);

    if (!newUser) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    return newUser;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
    const userQuery = new QueryBuilder(User.find({}).select('-password'), query)
        .search(userSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const meta = await userQuery.countTotal();
    const result = await userQuery.modelQuery;

    return {
        meta,
        result,
    };
};

const getSingleUserFromDB = async (id: string) => {
    const result = await User.findById(id).select('-password');
    return result;
};

const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
    const result = await User.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    }).select('-password');
    return result;
};

const deleteUserFromDB = async (id: string) => {
    const deletedUser = await User.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    ).select('-password');

    if (!deletedUser) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    return deletedUser;
};

const changeStatus = async (payload: {id: string, status: string }) => {
    const result = await User.findByIdAndUpdate(payload.id, {status: payload.status? "active" : "inactive"}, {
        new: true,
    }).select('-password');
    return result;
};

export const UserServices = {
    createUserIntoDB,
    changeStatus,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserIntoDB,
    deleteUserFromDB,
};
