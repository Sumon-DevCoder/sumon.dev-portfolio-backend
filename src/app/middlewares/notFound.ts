import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";

// Make sure the middleware function returns void
const notFound = (req: Request, res: Response, next: NextFunction): void => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API Not Found !!",
    error: "",
  });
};

export default notFound;
