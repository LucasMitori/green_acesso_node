import { Request, Response } from "express";
import "dotenv/config";
import { ILoteRequest, ILoteUpdate } from "../interfaces/lotes.interfaces";
import { listlotesService } from "../services/lotes/listLotes.service";
import { registerloteservice } from "../services/lotes/registerLotes.service";
import { retrieveLoteProfileService } from "../services/lotes/retrieveLoteProfile.service";
import { updateloteservice } from "../services/lotes/updateLote.service";
import { deleteloteservice } from "../services/lotes/deleteLote.service";

export const registerLotesController = async (req: Request, res: Response) => {
  const loteData: ILoteRequest = req.body;
  const newLote = await registerloteservice(loteData);
  return res.status(201).json(newLote);
};

export const retrieveLoteProfileController = async (
  req: Request,
  res: Response
) => {
  const loteId: number = parseInt(req.params.id);
  const loteProfile = await retrieveLoteProfileService(loteId);
  return res.json(loteProfile);
};

export const listlotesController = async (req: Request, res: Response) => {
  const alllotes = await listlotesService();
  return res.json(alllotes);
};

export const updateLoteController = async (req: Request, res: Response) => {
  const userData: ILoteUpdate = req.body;
  const updatedUser = await updateloteservice(
    parseInt(req.params.id),
    userData
  );
  return res.json(updatedUser);
};

export const deleteLoteController = async (req: Request, res: Response) => {
  const response = await deleteloteservice(parseInt(req.params.id));
  return res.status(204).json(response);
};
