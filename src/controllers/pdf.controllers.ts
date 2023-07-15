import { Request, Response } from "express";
import { splitPDF } from "../services/boletos/splitPDF.service";
import fs from "fs";
import path from "path";

export const receivePDF = async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "PDF file not provided" });
  }

  const pdfPath = path.resolve(__dirname, "..", "uploads", file.originalname);
  fs.writeFileSync(pdfPath, fs.readFileSync(file.path));

  const result = await splitPDF(pdfPath);

  return res.json(result);
};
