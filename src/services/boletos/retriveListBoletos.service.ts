import { AppDataSource } from "../../data-source";
import { Boleto } from "../../entities/boletos.entity";

export const retrieveListBoletos = async () => {
  const boletosRepository = AppDataSource.getRepository(Boleto);
  const boletos = await boletosRepository.find();

  return boletos;
};
