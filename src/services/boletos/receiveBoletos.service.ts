import { Boleto } from "../../entities/boletos.entity";
import { AppDataSource } from "../../data-source";
import csv from "csv-parser";
import fs from "fs";
import { Lote } from "../../entities/lotes.entity";
import { AppError } from "../../errors";

export const receiveBoletosService = async (boletosFile: any) => {
  const boletosRepository = AppDataSource.getRepository(Boleto);
  const boletos: Boleto[] = [];
  const lotesRepository = AppDataSource.getRepository(Lote);
  const lotes = await lotesRepository.find();

  const nomeLoteToIdMap: { [key: string]: number } = {};
  lotes.forEach((lote) => {
    nomeLoteToIdMap[lote.nome] = lote.id;
  });

  const boletosNaoEncontrados: string[] = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(boletosFile.path)
      .pipe(csv({ separator: ";" }))
      .on("data", (data) => {
        const novoBoleto = new Boleto();
        novoBoleto.nome_sacado = data.nome;
        const nomeUnidade = data.unidade;
        novoBoleto.valor = parseFloat(data.valor.replace(",", "."));
        novoBoleto.linha_digitavel = data.linha_digitavel;
        novoBoleto.ativo = true;

        console.log(nomeLoteToIdMap);
        console.log(novoBoleto.nome_sacado);
        const idLote = nomeLoteToIdMap[novoBoleto.nome_sacado];

        if (idLote) {
          novoBoleto.id_lote = idLote;
          boletos.push(novoBoleto);
        } else {
          boletosNaoEncontrados.push(novoBoleto.nome_sacado);
        }
      })
      .on("end", () => {
        resolve(undefined);
      })
      .on("error", (error) => {
        reject(error);
      });
  });

  await boletosRepository.save(boletos);

  if (boletosNaoEncontrados.length > 0) {
    throw new AppError(
      `Boletos imported successfully, but some names were not found in the lotes table: ${boletosNaoEncontrados}`,
      404
    );
  } else {
    throw new AppError("Boletos imported successfully", 200);
  }
};
