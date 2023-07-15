import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import "dotenv/config";
import {
  ILoteLogin,
  ILoteLoginResponse,
} from "../../interfaces/lotes.interfaces";
import { AppError } from "../../errors";
import { Lote } from "../../entities/lotes.entity";
import { AppDataSource } from "../../data-source";
import { loteWithoutPasswordSchema } from "../../schemas/lotes.schemas";

export const loginService = async ({
  email,
  password,
}: ILoteLogin): Promise<ILoteLoginResponse> => {
  const loteRepository = AppDataSource.getRepository(Lote);

  const lote = await loteRepository
    .findOneByOrFail({
      email: email,
    })
    .catch(() => {
      throw new AppError("Lote or password is invalid", 403);
    });

  const passwordMatch = await compare(password, lote.password);

  if (!passwordMatch) {
    throw new AppError("Lote or password is invalid", 403);
  }

  const token = jwt.sign(
    {
      isAdm: lote.isAdmin,
    },
    process.env.SECRET_KEY!,
    {
      subject: String(lote.id),
      expiresIn: "24h",
    }
  );

  const loteWithoutPassword = await loteWithoutPasswordSchema.validate(lote, {
    stripUnknown: true,
  });

  return { token, user: loteWithoutPassword };
};
