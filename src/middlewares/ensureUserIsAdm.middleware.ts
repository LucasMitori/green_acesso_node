import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Lote } from "../entities/lotes.entity";
import { AppError } from "../errors";

export const ensureUserIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(Lote);
  const verifyUser = await userRepository.findOneBy({
    id: parseInt(req.user.id),
  });
  if (!verifyUser.isAdmin) {
    throw new AppError("Missing admin authorization", 403);
  }

  return next();
};
