import { Request, Response } from "express";
import { ILoteLogin } from "../interfaces/lotes.interfaces";
import { loginService } from "../services/login/login.service";

export const loginController = async (req: Request, res: Response) => {
  const loginInformation: ILoteLogin = req.body;
  const data = await loginService(loginInformation);
  return res.json(data);
};
