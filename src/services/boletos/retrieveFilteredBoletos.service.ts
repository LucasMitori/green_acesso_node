import {
  FindManyOptions,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
} from "typeorm";
import { Boleto } from "../../entities/boletos.entity";
import { AppDataSource } from "../../data-source";

export const retrieveFilteredBoletos = async (
  nome: string,
  valor_inicial: string,
  valor_final: string,
  id_lote: string
) => {
  const boletosRepository = AppDataSource.getRepository(Boleto);

  const filters: FindManyOptions<Boleto> = {};

  if (nome) {
    filters.where = {
      ...filters.where,
      nome_sacado: Like(`%${nome}%`),
    };
  }

  if (valor_inicial) {
    filters.where = {
      ...filters.where,
      valor: MoreThanOrEqual(parseFloat(valor_inicial)),
    };
  }

  if (valor_final) {
    filters.where = {
      ...filters.where,
      valor: LessThanOrEqual(parseFloat(valor_final)),
    };
  }

  if (id_lote) {
    filters.where = { ...filters.where, id_lote: parseInt(id_lote) };
  }

  const filteredBoletos = await boletosRepository.find(filters);

  return filteredBoletos;
};
