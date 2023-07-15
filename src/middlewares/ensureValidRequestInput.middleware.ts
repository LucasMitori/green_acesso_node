import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
import { ILoteRequest } from "../interfaces/lotes.interfaces";

export const ensureValidRequestInputMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const loteData: ILoteRequest = request.body;

  let invalidField = false;

  for (let key in loteData) {
    if (key === "id" || key === "isAdmin") {
      invalidField = true;
    }
  }

  if (invalidField === true) {
    throw new AppError("Modification not allowed. Invalid field value", 401);
  }

  return next();
};
