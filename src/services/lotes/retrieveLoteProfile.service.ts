import { AppDataSource } from "../../data-source";
import { Lote } from "../../entities/lotes.entity";
import { ILoteResponse } from "../../interfaces/lotes.interfaces";
import { loteWithoutPasswordSchema } from "../../schemas/lotes.schemas";

export const retrieveLoteProfileService = async (
  paramsUserId: number
): Promise<ILoteResponse> => {
  const loteRepository = AppDataSource.getRepository(Lote);
  const loteProfile = await loteRepository.findOneBy({ id: paramsUserId });

  const loteWithoutPassword = await loteWithoutPasswordSchema.validate(
    loteProfile,
    {
      stripUnknown: true,
    }
  );

  return loteWithoutPassword;
};
