import { AppDataSource } from "../../data-source";
import { Lote } from "../../entities/lotes.entity";
import { AppError } from "../../errors";

export const deleteloteservice = async (
  paramsUserId: number
): Promise<Object> => {
  const loteRepository = AppDataSource.getRepository(Lote);
  const loteToDelete = await loteRepository
    .findOneByOrFail({
      id: paramsUserId,
    })
    .catch(() => {
      throw new AppError("Lote não encontrado", 404);
    });

  await loteRepository.softRemove(loteToDelete);

  return {};
};
