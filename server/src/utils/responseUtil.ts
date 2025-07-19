import { Response } from "express";

export const sendErrorResponse = (
  statusCode: number,
  res: Response,
  error: any,
  errorMessage: string
): void => {

  const message = errorMessage || error?.message;

  res.status(statusCode).json({
    success: false,
    error: message,
    details: Array.isArray(error) ? error : [error], // Include full error details
  });
};

export const sendSuccessResponse = <T>(
  statusCode: number,
  res: Response,
  data: T,
  successMessage: string
): void => {
  res
    .status(statusCode)
    .json({ success: true, message: successMessage, response: data });
};
