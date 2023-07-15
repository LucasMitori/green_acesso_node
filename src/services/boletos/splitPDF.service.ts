import fs from "fs";
import path from "path";
import { PDFDocument } from "pdf-lib";
import { Boleto } from "../../entities/boletos.entity";
import { AppDataSource } from "../../data-source";
import { FindOneOptions } from "typeorm";

export const splitPDF = async (pdfPath: string): Promise<void> => {
  const pdfData = await fs.promises.readFile(pdfPath);

  const pdfDoc = await PDFDocument.load(pdfData);
  const pageCount = pdfDoc.getPageCount();

  const boletosFolder = path.join(__dirname, "..", "..", "uploads", "boletos");
  //   const boletosFolder = path.join("C:", "Users", "seu-usuario", "Downloads", "boletos");

  if (!fs.existsSync(boletosFolder)) {
    fs.mkdirSync(boletosFolder);
  }

  const names = ["MARCIA CARVALHO", "JOSE DA SILVA", "MARCOS ROBERTO"];

  const boletosRepository = AppDataSource.getRepository(Boleto);

  for (let i = 0; i < pageCount; i++) {
    const currentPage = pdfDoc.getPages()[i];
    const name = names[i];

    const newPDFDoc = await PDFDocument.create();
    const [copiedPage] = await newPDFDoc.copyPages(pdfDoc, [i]);
    newPDFDoc.addPage(copiedPage);

    // Obter o ID correspondente ao nome do boleto
    const boleto = await boletosRepository.findOne({
      where: { nome_sacado: name },
    } as FindOneOptions<Boleto>);
    const id = boleto ? boleto.id : "";

    const newPDFPath = path.join(boletosFolder, `${id}.pdf`);
    const newPDFBytes = await newPDFDoc.save();

    await fs.promises.writeFile(newPDFPath, newPDFBytes);
  }

  await fs.promises.unlink(pdfPath);
};
