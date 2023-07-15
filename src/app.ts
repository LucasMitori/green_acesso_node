import "express-async-errors";
import express from "express";
import cors from "cors";
import { setupSwagger } from "./swagger";
import multer from "multer";
import path from "path";

const app = express();

app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "uploads");
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.use(upload.single("boletos"));

setupSwagger(app);

import { lotesRoutes } from "./routes/lotes.routes";
import { loginRoutes } from "./routes/login.routes";
import { boletosRoutes } from "./routes/boletos.routes";
import { pdfRoutes } from "./routes/pdf.routes";
import { handleError } from "./errors";

app.use("/lotes", lotesRoutes);
app.use("/login", loginRoutes);
app.use("/boletos", boletosRoutes);
app.use("/pdf", pdfRoutes);

app.use(handleError);

export { app };
