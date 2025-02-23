import jwt, { JwtPayload } from 'jsonwebtoken';

export const createToken = (
    payload: { email: string; role: string },
    secret: string,
) => {
    return jwt.sign(payload, secret, {
        expiresIn: '30m',
    });
};

export const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret) as JwtPayload;
};
