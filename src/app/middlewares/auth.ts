import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import handleAsync from '../utils/handleAsync';
import ApiError from '../utils/apiError';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
    return handleAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const token = req.headers.authorization;

            if (!token) {
                throw new ApiError(
                    httpStatus.UNAUTHORIZED,
                    'You are not authorized!',
                );
            }

            // checking if the given token is valid
            let decoded;
            try {
                decoded = jwt.verify(
                    token,
                    config.jwt_access_secret as string,
                ) as JwtPayload;
            } catch (error: unknown) {
                console.log(error);
                throw new ApiError(httpStatus.UNAUTHORIZED, 'unauthorized');
            }

            const { role, email } = decoded;

            const user = await User.findOne({ email });

            if (!user) {
                throw new ApiError(
                    httpStatus.NOT_FOUND,
                    'This user is not found !',
                );
            }

            const isDeleted = user?.isDeleted;

            if (isDeleted) {
                throw new ApiError(
                    httpStatus.FORBIDDEN,
                    'This user is deleted !',
                );
            }

            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new ApiError(
                    httpStatus.UNAUTHORIZED,
                    'You are not authorized',
                );
            }

            req.user = decoded as JwtPayload & { role: string };
            next();
        },
    );
};

export default auth;
