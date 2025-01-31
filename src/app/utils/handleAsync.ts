import { RequestHandler } from 'express';

const handleAsync = (requestHandler: RequestHandler) => {
    const promiseHandler: RequestHandler = (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((error) =>
            next(error),
        );
    };
    return promiseHandler;
};

export default handleAsync;
