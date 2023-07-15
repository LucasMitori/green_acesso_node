import fs from "fs";
import path from "path";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { Boleto } from "../../entities/boletos.entity";

const filePath = path.resolve(__dirname, "../../uploads/relatorio");

export const generatePDFReport = async (
  boletos: Boleto[]
): Promise<Uint8Array> => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  const { width, height } = page.getSize();
  const fontSize = 12;

  const table = [
    ["id", "nome_sacado", "id_lote", "valor", "linha_digitavel"],
    ...boletos.map((boleto) => [
      boleto.id.toString(),
      boleto.nome_sacado,
      boleto.id_lote.toString(),
      typeof boleto.valor === "number" ? boleto.valor.toFixed(2) : "",
      boleto.linha_digitavel,
    ]),
  ];

  const tableRows = table.length;
  const tableColumns = table[0].length;

  const cellWidth = width / tableColumns;
  const cellHeight = 20;

  page.setFontSize(fontSize);
  page.setFont(await pdfDoc.embedFont(StandardFonts.Helvetica));

  for (let i = 0; i < tableRows; ++i) {
    for (let j = 0; j < tableColumns; ++j) {
      const text = table[i][j];
      const x = j * cellWidth;
      const y = height - (i + 1) * cellHeight;

      page.drawText(text, { x, y, size: fontSize });
    }
  }

  const pdfBytes = await pdfDoc.save();

  const timestamp = new Date().getTime();
  const fileName = `relatorio_${timestamp}.pdf`;
  const fileFullPath = path.join(filePath, fileName);

  fs.writeFileSync(fileFullPath, pdfBytes);

  return pdfBytes;
};
