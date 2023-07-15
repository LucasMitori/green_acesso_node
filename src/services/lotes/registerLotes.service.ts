import { AppDataSource } from "../../data-source";
import { Lote } from "../../entities/lotes.entity";
import { ILoteResponse, ILoteRequest } from "../../interfaces/lotes.interfaces";
import { loteWithoutPasswordSchema } from "../../schemas/lotes.schemas";
import { AppError } from "../../errors";
import { DeepPartial } from "typeorm";

export const registerloteservice = async (
  userData: ILoteRequest
): Promise<ILoteResponse> => {
  const loteRepository = AppDataSource.getRepository(Lote);

  const loteAlreadyExists = await loteRepository.exist({
    where: { email: userData.email },
    withDeleted: true,
  });

  if (loteAlreadyExists) {
    throw new AppError("Lote já existe", 409);
  }

  const newLote = loteRepository.create(userData as DeepPartial<Lote>);

  await loteRepository.save(newLote);

  const loteWithoutPassword = await loteWithoutPasswordSchema.validate(
    newLote,
    {
      stripUnknown: true,
    }
  );

  return loteWithoutPassword;
};
