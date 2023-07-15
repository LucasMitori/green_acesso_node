import { Request, Response } from "express";
import { receiveBoletosService } from "../services/boletos/receiveBoletos.service";
import { retrieveListBoletos } from "../services/boletos/retriveListBoletos.service";
import { retrieveFilteredBoletos } from "../services/boletos/retrieveFilteredBoletos.service";
import { generatePDFReport } from "../services/boletos/generateReportPDF.service";
import { Buffer } from "buffer";

export const receiveBoletos = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  await receiveBoletosService(req.file);

  return res.status(200).json({ message: "Boletos imported successfully" });
};

export const getBoletos = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { relatorio } = req.query;

  if (relatorio === "1") {
    const boletos = await retrieveListBoletos();

    const pdfBuffer = await generatePDFReport(boletos);

    const base64 = Buffer.from(pdfBuffer).toString("base64");

    res.json({ base64 });
  } else {
    const boletos = await retrieveListBoletos();
    res.json(boletos);
  }
};

export const getBoletosWithFilters = async (req: Request, res: Response) => {
  const { nome, valor_inicial, valor_final, id_lote } = req.query;

  const filteredBoleto = await retrieveFilteredBoletos(
    nome as string,
    valor_inicial as string,
    valor_final as string,
    id_lote as string
  );
  return res.json(filteredBoleto);
};
