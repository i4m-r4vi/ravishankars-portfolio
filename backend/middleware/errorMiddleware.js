import { errorResponse } from "../utils/response.js";
import { safeLog } from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
    const errorLog = String(err.stack || err.message);
    safeLog(errorLog);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    return errorResponse(res, statusCode, err.message);
};
