// src/middleware/errorHandler.js
import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  console.error(err);
  const isHttpError = err instanceof HttpError;
  const isProd = process.env.NODE_ENV === "production";
  const status = isHttpError ? err.status : 500;

   const response = {
    message:
      isProd && !isHttpError
        ? 'Something went wrong. Please try again later.'
        : err.message,
  };

  if (isHttpError) {
    response.name = err.name;
  }

  res.status(status).json(response);
};
