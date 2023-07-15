import { Router } from "express";
import "dotenv/config";
import { ensureAuthMiddleware } from "../middlewares/ensure.authorization.middleware";
import { ensureDataValidationMiddleware } from "../middlewares/ensureDataValidation.middleware";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists.middleware";
import { ensureUserIsAdmin } from "../middlewares/ensureUserIsAdm.middleware";
import { ensureValidRequestInputMiddleware } from "../middlewares/ensureValidRequestInput.middleware";
import { loteRequestSchema } from "../schemas/lotes.schemas";
import {
  deleteLoteController,
  listlotesController,
  registerLotesController,
  retrieveLoteProfileController,
  updateLoteController,
} from "../controllers/lotes.controllers";

export const lotesRoutes = Router();

lotesRoutes.post(
  "",
  ensureDataValidationMiddleware(loteRequestSchema),
  registerLotesController
);

lotesRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureUserIsAdmin,
  listlotesController
);

lotesRoutes.get(
  "/:id",
  ensureAuthMiddleware,
  ensureUserExistsMiddleware,
  retrieveLoteProfileController
);

lotesRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureValidRequestInputMiddleware,
  updateLoteController
);

lotesRoutes.delete(
  "/:id",
  ensureUserExistsMiddleware,
  ensureAuthMiddleware,
  deleteLoteController
);
