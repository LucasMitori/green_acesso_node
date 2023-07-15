import { AppDataSource } from "../../data-source";
import { ILoteUpdate } from "../../interfaces/lotes.interfaces";
import { Lote } from "../../entities/lotes.entity";
import { AppError } from "../../errors";
import { loteUpdateSchema } from "../../schemas/lotes.schemas";
import { DeepPartial } from "typeorm";

export const updateloteservice = async (
  paramsUserId: number,
  userData: ILoteUpdate
): Promise<ILoteUpdate> => {
  const loteRepository = AppDataSource.getRepository(Lote);
  const loteToUpdate = await loteRepository
    .findOneByOrFail({
      id: paramsUserId,
    })
    .catch(() => {
      throw new AppError("Lote não encontrado", 404);
    });

  const updatedLote = loteRepository.create({
    ...loteToUpdate,
    ...(userData as DeepPartial<Lote>),
  });

  await loteRepository.save(updatedLote);

  const loteUpdatedReturn = await loteUpdateSchema.validate(updatedLote, {
    stripUnknown: true,
  });

  return loteUpdatedReturn;
};
