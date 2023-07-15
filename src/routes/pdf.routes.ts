import { Router } from "express";
import { ensureAuthMiddleware } from "../middlewares/ensure.authorization.middleware";
import { receivePDF } from "../controllers/pdf.controllers";

export const pdfRoutes = Router();

pdfRoutes.post("/import", ensureAuthMiddleware, receivePDF);
