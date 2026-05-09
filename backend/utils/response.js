export const successResponse = (res, statusCode, data, message = "Success") => {
    return res.status(statusCode).json({ success: true, message, data });
};

export const errorResponse = (res, statusCode, message, errors = []) => {
    return res.status(statusCode).json({ success: false, message, errors });
};
