import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  ILoteRequest,
  ILoteLogin,
  ILoteUpdate,
  ILoteResponse,
} from "../interfaces/lotes.interfaces";

const loteRequestSchema: SchemaOf<ILoteRequest> = yup.object().shape({
  nome: yup.string().required(),
  gender: yup
    .mixed<"male" | "female" | "other">()
    .oneOf(["male", "female", "other"])
    .required(),
  ativo: yup.boolean().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  isAdmin: yup.boolean().notRequired(),
});

const loteWithoutPasswordSchema: SchemaOf<ILoteResponse> = yup.object().shape({
  nome: yup.string().required(),
  gender: yup
    .mixed<"male" | "female" | "other">()
    .oneOf(["male", "female", "other"])
    .required(),
  ativo: yup.boolean().required(),
  email: yup.string().email().required(),
  isAdmin: yup.boolean().notRequired(),
});

const loteLoginSchema: SchemaOf<ILoteLogin> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const loteUpdateSchema: SchemaOf<ILoteUpdate> = yup.object().shape({
  nome: yup.string().required(),
  gender: yup
    .mixed<"male" | "female" | "other">()
    .oneOf(["male", "female", "other"])
    .required(),
  ativo: yup.boolean().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  isAdmin: yup.boolean().notRequired(),
});

const listAlllotesSchema: SchemaOf<ILoteResponse[]> = yup.array(
  loteWithoutPasswordSchema
);

export {
  loteRequestSchema,
  loteWithoutPasswordSchema,
  loteLoginSchema,
  loteUpdateSchema,
  listAlllotesSchema,
};
