import { Router } from "express";
import { ensureAuthMiddleware } from "../middlewares/ensure.authorization.middleware";
import {
  getBoletos,
  getBoletosWithFilters,
  receiveBoletos,
} from "../controllers/boletos.controllers";

export const boletosRoutes = Router();

boletosRoutes.get("/", getBoletos);
boletosRoutes.post("/import", ensureAuthMiddleware, receiveBoletos);
boletosRoutes.get("/filtrados", getBoletosWithFilters);
