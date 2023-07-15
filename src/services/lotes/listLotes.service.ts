import { AppDataSource } from "../../data-source";
import { Lote } from "../../entities/lotes.entity";
import { ILoteResponse } from "../../interfaces/lotes.interfaces";
import { listAlllotesSchema } from "../../schemas/lotes.schemas";

export const listlotesService = async (): Promise<ILoteResponse[]> => {
  const loteRepository = AppDataSource.getRepository(Lote);

  const alllotes = await loteRepository.find();

  const alllotesWithoutPassword = await listAlllotesSchema.validate(alllotes, {
    stripUnknown: true,
  });

  return alllotesWithoutPassword;
};
